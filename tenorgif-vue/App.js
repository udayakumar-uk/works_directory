
var headerTemplates = `
<header>
    <div class="container-fluid py-2">
        <div class="d-flex align-items-center gap1">
            <div class="logo-section">
                <a href="/" class="d-inline-block"><img src="./img/Tenor_logo.png" alt="Tenor" title="Tenor Logo" class="img-fluid" width="100"/></a>
            </div>
            <div class="input-section flex-grow-1">
                <div class="input-group">
                    <div class="input-group-prepend rounded">
                        <span class="input-group-text" > <span class="material-icons"> search </span></span>
                    </div>
                    <input type="text" v-model.trim="searchKey" class="form-control p-0" @keyup.enter="searchGif(searchKey)" id="search-bar" autocomplete="off" placeholder="Search your favorite GIFs" />
                </div>
            </div>
        </div>
    </div>
</header>`;



var resultComponents = headerTemplates + 
`<div class="main container-fluid">
    <div class="row py-4">
        <div class="col-12 d-none d-sm-block col-sm-4 col-md-4 col-lg-3 col-xl-2"> 
            <div class="sticky-position">
                <div class="tenor-title pb-3">
                    <h6>Trending Categories</h6>
                </div>
                <div class="categoryList rounded p-2">
                    <ul class="p-0 m-0" type="none">
                        <li :key="index" v-for="(item, index) in tenorTrendingTermData">
                        <span @click="getGifData(item, index);searchGif(item)" :class="{'uibtn': activeItemId === index}" class="p-2 m-0 text-left rounded d-block">{{item}}</span> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-10">
            <section class="trending-seciton">
                <div class="tenor-title">
                    <h5>Trending tenor Searches</h5>
                </div>
                <div class="trendingSlider slider overflow-hidden">  
                    <div :key="item.searchterm" v-for="item in tenorTrendingData">
                        <div class="gifBox rounded mx-2 my-3" :id="item.id" >
                            <label for="content_description">{{item.searchterm}}</label>
                            <img @click="getGifData(item.searchterm);searchGif(searchKey)" :src="item.image" class="img-fluid" alt="GIF">
                            <button type="button" class="btn copy-btn" data-toggle="tooltip" :title="copyText" @click="copyURL(item.image)"><span class="material-icons"> content_copy </span></button>
                        </div>
                    </div>
                </div>
            </section>
            <section class="featured-seciton pt-4">
                <div class="tenor-title">
                    <h5>Featured GIFs</h5>
                </div>
                <div class="gifContainer row">
                    <div class="col-md-4 col-lg-3 col-sm-6 col-12" :key="item.id" v-for="item in tenorFeaturedData">
                        <div class="gifBox rounded" :id="item.id" >
                            <label for="content_description">{{item.content_description}}</label>
                            <img v-if="showfeaGif" @click="getGifData(item.content_description);searchGif(item.content_description)" :src="item.itemurl+formet" class="img-fluid" alt="GIF">
                            <button type="button" data-toggle="tooltip" :title="copyText" class="btn copy-btn" @click="copyURL(item.media[0].gif.url)"><span class="material-icons"> content_copy </span></button>
                        </div>
                    </div>
                </div>
                <div class="noMoreData text-muted text-center p-3" v-if="tenorFeaturedData.length == 0 ">
                    <p>No Results Found</p>
                </div>
                <div class="noMoreData text-muted text-center pt-5 p-3" v-if="tenorFeaturedData.length !== 0 ">
                    <span>Showing 1 to {{tenorFeaturedData.length}} of {{tenorFeaturedData.length == 30 || tenorFeaturedData.length == 40 || tenorFeaturedData.length == 50 ? 50 : tenorFeaturedData.length }} results</span>
                </div>
                
                <div class="loadMoreBtn text-center" v-if="tenorFeaturedData.length < 50 && tenorFeaturedData.length == 30 || tenorFeaturedData.length == 40">
                    <button @click="loadMore(10)"  class="btn uibtn"> Load More  <span class="material-icons align-middle"> keyboard_double_arrow_down </span></button>
                </div> 
            </section>
        </div>
    </div>
</div>`;




export default {
    
    name: 'Root',
    template: resultComponents,
    data(){
        return {
            apiKey: "LIVDSRZULELA",
            searchKey: "",
            formet: ".gif",
            tenorLimit: 30,
            tenorTrendingTermData: {},
            tenorTrendingData: {},
            tenorFeaturedData: {},
            showfeaGif: true,
            activeItemId: '',
            copyText: 'Copy Url'
        }
    },
    
    mounted(){

        this.fetchTrendingTermsData();

        this.fetchTrendingData();

        this.fetchFeaturedData();

        setTimeout(function(){
            
        $(".trendingSlider").slick({
            dots: false,
            infinite: true,
            centerMode: false,
            slidesToShow: 5,
            slidesToScroll: 3,
            autoplay:true,
            prevArrow:"<button type='button' class='slick-prev float-left'><span class='material-icons'> chevron_left </span></button>",
            nextArrow:"<button type='button' class='slick-next float-right'><span class='material-icons'> chevron_right </span></button>",
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
            ]
            
        });

        }, 150);

    },


    methods: {

         copyURL: function(url) {
            var _this = this; 

             navigator.clipboard.writeText(url);
            _this.copyText = "Copied!";

            setTimeout(function(){
                _this.copyText = "Copy Url";
            }, 800);
        },

        searchGif : function(searchText){
            var _this = this; 

            // active categories if match the string
            var getIndex = _this.tenorTrendingTermData.findIndex(img => img === searchText.toLowerCase());
            _this.activeItemId = getIndex;

            if(_this.searchKey !== ""){
                _this.tenorLimit = 30;
            }
            
            _this.fetchFeaturedData();
        },

        getGifData:function(value, index){
            var _this = this; 
            
            _this.activeItemId = index;
            _this.searchKey = value;

        },

        fetchTrendingTermsData: function(){
            var _this = this; 

            axios.get('https://g.tenor.com/v1/trending_terms?key=' + _this.apiKey).then(function (response) {
                console.log(response);
                _this.tenorTrendingTermData = response.data.results;
            })
            .catch(error => {
              console.error("There was an error!", error);
            });
        },

        fetchTrendingData: function(){
            var _this = this; 

            axios.get('https://g.tenor.com/v1/categories?key=' + _this.apiKey).then(function (response) {
                console.log(response.data);
                _this.tenorTrendingData = response.data.tags;
            })
            .catch(error => {
              console.error("There was an error!", error);
            });
        },
        
        fetchFeaturedData: function(){
            var _this = this; 

            var setCategory = _this.searchKey !== "" ? "search" : "featured";
            
            // keys :  trending_terms, trending,  featured,  categories

            axios.get('https://g.tenor.com/v1/' + setCategory + '?key=' + _this.apiKey + '&q=' + _this.searchKey + '&limit=' + _this.tenorLimit).then(function (response) {
                console.log(response.data);
                _this.tenorFeaturedData = response.data.results;
            })
            .catch(error => {
              console.error("Error :", error);
            });

            if(_this.tenorLimit <= 30){
                _this.refreshGif();
            }
        },

        refreshGif: function(){
            var _this = this; 

            //  refresh gifs for different
            _this.showfeaGif = false;
            
            setTimeout(function(){
                _this.showfeaGif = true;
            }, 200);
        },

        loadMore: function(lmt){
            var _this = this;

            // max 50 gif will shown
            if(_this.tenorLimit < 50){
                _this.tenorLimit = _this.tenorLimit + lmt
            }
            _this.fetchFeaturedData();
        },



    }
}