<template>
    <div class="main-i-index">
        <swiper class="my-swipe" :options="swiperOption" ref="mySwiper">
            <swiper-slide class="slide1 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide2 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide3 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide4 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide5 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide6 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide7 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide8 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide9 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide10 slide">
                <a target="_blank" href=" class="news-body">
                    <!---->
                    <span><a href="javascript:void(0)" title="Lorem Ipsum Dolor sit">Lorem Ipsum Dolor sit amet</a></span>
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
        <div class="all-pub">
            <hot-pub :type="hotPub" :class="hotPub"></hot-pub>
            <new-pub :type="newPub" :class="newPub"></new-pub>
        </div>
    </div>
</template>

<script>
	import listPage from '../components/listPage'
	export default {
		data() {
			return {
				newPub: "newPub",
				hotPub: "hotPub",
				swiperOption: {
					// NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
					// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
					initialSlide: 0,
					direction: 'horizontal',
					speed: 1000,
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					autoHeight: true,
					notNextTick: true,
					setWrapperSize :true,
					autoHeight: true,
					pagination : '.swiper-pagination',
					paginationClickable :true,
					prevButton:'.swiper-button-prev',
					nextButton:'.swiper-button-next',
					scrollbar:'.swiper-scrollbar',
					slidesPerView: 3,
					spaceBetween: 30,
					mousewheelControl : true,
					observeParents:true
				}
			}
		},
		components: {
			'newPub': listPage,
			'hotPub': listPage
		}
	}
</script>

<style lang="less">
	.main-i-index {
	    width: 100%;
	    padding-bottom: 0px;
	    margin-top: 20px;
		.my-swipe {
			width: 80%;
			height: 300px;
			text-align: center;
			.news-body {
				display: block;
				text-decoration: none;
				width: 100%;
				height: 100%;
			}
			.slide {
			  height: 100%;
			  color: #fff;
			  position: relative;
			  cursor: pointer;
			  span {
				display: inline-block;
			    margin: 0;
			    height: 40px;
			    width: 100%;
			    padding: 0 7px;
			    position: relative;
			    top: 216px;
			    background: #000;
			    opacity: 0.7;
			    overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			  	a {
				    color: #fff;
				    line-height: 40px;
				    font-size: 16px;
			  	}
			  }
			}
			.slide1 {
				background: url('../static/images/new-small-banner-1.jpg') no-repeat center;
			}
			.slide2 {
				background: url('../static/images/new-small-banner-2.jpg') no-repeat center;
			}
			.slide3 {
				background: url('../static/images/new-small-banner-3.jpg') no-repeat center;
			}
			.slide4 {
				background: url('../static/images/new-small-banner-4.jpg') no-repeat center;	
			}
			.slide5 {
				background: url('../static/images/new-small-banner-5.jpg') no-repeat center;
			}
			.slide6 {
				background: url('../static/images/new-small-banner-6.jpg') no-repeat center;
			}
			.slide7 {
				background: url('../static/images/new-small-banner-7.jpg') no-repeat center;
			}
			.slide8 {
				background: url('../static/images/new-small-banner-8.jpg') no-repeat center;
			}
			.slide9 {
				background: url('../static/images/new-small-banner-9.jpg') no-repeat center;
			}
			.slide10 {
				background: url('../static/images/new-small-banner-10.jpg') no-repeat center;
			}
		}
		.all-pub {
			margin: 30px auto 0px;
			display: flex;
		    width: 80%;
		    flex-direction: row;
		    justify-content: space-between;
		}
	}

</style>