const { request } = require('express');
var express = require('express');
const { resolve } = require('path');
const { all } = require('express/lib/application');
const { assert } = require('console');

//Database Connection
require('../model/database');

//Database Model//
const PandeetModel = require('../model/pandeet');
const VideosModel = require('../model/kytvideos');
const allNews = require('../model/allnews');
const BlogsModel = require('../model/blogs')




        exports.homePage = async(req, res, next) => {
            try{
                const homeslider_videos = await VideosModel.find({}).sort({videos_id:-1}).limit('1').lean();
                const top_four = await VideosModel.find({}).sort({videos_id:-1}).skip('2').limit('3').lean();
                
                //Videos Category
                const ShivVidoes = await VideosModel.find({videos_category:'shiv_ji'}).sort({videos_id:-1}).skip('1').limit('4').lean();
                const VishnuVideos = await VideosModel.find({videos_category:'vishnu_ji'}).sort({videos_id:-1}).skip('1').limit('8').lean();
                const ShaktiVidoes = await VideosModel.find({videos_category:'shakti'}).sort({videos_id:-1}).skip('1').limit('6').lean();
                const MahatmaVideos = await VideosModel.find({videos_category:'mahatma'}).sort({videos_id:-1}).skip('1').limit('3').lean();
                const blogs = await BlogsModel.find({}).sort({blogs_id:-1}).limit('4').lean();

                res.render('home',
                {
                    pageTitle: 'Northeast Herald | Ne Herald | Agartala News, Tripura News, Kokborok News, Northeast News',
                    pageKeyword: 'neherald, tripura university,northeast herald, tripura news, kokborok news, tripura info',
                    pageDescription: 'Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.',
                    pageUrl: 'https://www.neherald.com/',
                    imageCard: 'https://www.neherald.com/logo.png',
                    homeslider_videos, top_four, ShivVidoes, VishnuVideos, ShaktiVidoes, MahatmaVideos,blogs
                });
            }
            catch{
                res.status(500).send({message: error.message || "Error in Homepage"});
            }
        }






        exports.newsPage = async(req, res) =>{
            try{
                let nUrl = req.params.id;
                let catD = req.params.cate;
                const singlenews = await allNews.findOne({post_category:catD,post_url:nUrl}).lean();
                const relatedNews = await allNews.find({post_category:catD,post_url:{$ne:nUrl}}).sort({news_id:-1}).limit('5').lean();
                const bnews = await breakingNews.find().sort({brnews_id:-1}).limit('5').lean();

                console.log(singlenews.post_name);
                //const rNews = await allNews.find({}).sort({news_id:-1}).limit('3');
                res.render('news',
                {
                    pageTitle: singlenews.post_name + ' | Northeast Herald',
                    pageKeyword: singlenews.post_keyword,
                    pageDescription: singlenews.meta_description,
                    pageUrl: 'https://www.neherald.com/'+singlenews.post_category+'/'+singlenews.post_url,
                    imageCard: singlenews.post_image,
                    singlenews,
                    relatedNews, 
                    bnews
                    
                });
            }
            catch{
                res.redirect('/error/404')
            }
        }

        exports.categoryPage = async(req, res) => {
            try{
            let catName = req.params.cat;
            const categoryAll = await allNews.find({post_category:catName}).sort({news_id:-1}).lean();
            const recentNewscat = await allNews.find({post_category:{$ne:catName}}).sort({news_id:-1}).limit('10').lean();
            const bnews = await breakingNews.find().sort({brnews_id:-1}).limit('5').lean();

            //const pk = await allKey.findOne({page_category:catName});
            res.render('category',
            {
                    pageTitle: catName.charAt(0).toUpperCase() + catName.slice(1) + ' | Northeast Herald',
                    pageKeyword: 'neherald, tripura university,northeast herald, tripura news, kokborok news, tripura info',
                    pageDescription: 'Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.',
                    pageUrl: 'https://www.neherald.com/',
                    imageCard: 'https://www.neherald.com/logo.png',
                    pageCategory: catName,
                    categoryAll,
                    recentNewscat,
                    bnews,
                    catName
            });
            }
            catch{
                res.status(500).send({message: error.message || "Error in Category Page"});
            }
        }

        exports.pagesection = async(req, res) => {
            try{
                let pUrl = req.params.pageurl;
                const pageI = await allPag.findOne({page_url:pUrl}).lean();
                const bnews = await breakingNews.find().sort({brnews_id:-1}).limit('5').lean();

                //const pk = await allKey.findOne({page_category:catName});
                res.render('pages',
                {
                        pageTitle: pageI.page_title + ' | Northeast Herald',
                        pageKeyword: pageI.page_keyword,
                        pageDescription: pageI.page_description,
                        pageUrl: 'https://www.neherald.com/'+pageI.page_url,
                        imageCard: 'https://www.neherald.com/logo.png',
                        pageI,
                        bnews,
                        heading: pageI.page_title
                });
            }
                catch{
                    res.status(500).send({message: error.message || "Error in Category Page"});
                }
            
        }

        exports.topNewsPage = async(req, res) =>{
            const topheadlines = await allNews.find({ne_insight:'yes'}).sort({news_id:-1}).lean();
            const recentNewscat = await allNews.find().sort({news_id:-1}).limit('10').lean();
            //const oneDay = await allNews.find({news_id:'3291'}).sort({news_id:-1}).limit('1').lean();
            const bnews = await breakingNews.find().sort({brnews_id:-1}).limit('5').lean();
            res.render('topnews',{
                    pageTitle: 'Tripura Top News : NE Herald',
                    pageKeyword: 'neherald, tripura university,northeast herald, tripura news, kokborok news, tripura info',
                    pageDescription: 'Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.',
                    pageUrl: 'https://www.neherald.com/',
                    imageCard: 'https://www.neherald.com/logo.png',
                    topheadlines,
                    recentNewscat,
                    topheadlines,
                    bnews,
                    //oneDay

            })
        }

        exports.Error = async(req, res) =>{
            res.render('404');
        }

        exports.searchNews = async(req, res, next) =>{
            try {
                const squery = req.query.q;    
                const searchQuery = await allNews.find({$text: {$search:squery}}).sort({news_id:-1}).lean();
                const recentNewscat = await allNews.find().sort({news_id:-1}).limit('8').lean();

                console.log(searchQuery)
                //res.json(topnews);
                res.render('search',
                {
                    pageTitle: squery.charAt(0).toUpperCase() + squery.slice(1) + ' | Northeast Herald',
                    pageKeyword: 'neherald, tripura university,northeast herald, tripura news, kokborok news, tripura info',
                    pageDescription: 'Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.',
                    pageUrl: 'https://www.neherald.com/',
                    imageCard: 'https://www.neherald.com/logo.png',
                    pageCategory: squery,
                    searchQuery, recentNewscat
                });
            } catch(error) {
                next(error);
            }

        }

        exports.photoAlbum = async(req, res, next) =>{
            try{
                const allgallery = await allGallery.find().sort({gallery_id:-1}).lean();
                res.render('album',
                {
                    pageTitle: 'Photo Album| Northeast Herald',
                    pageKeyword: 'neherald, tripura university,northeast herald, tripura news, kokborok news, tripura info',
                    pageDescription: 'Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.',
                    pageUrl: 'https://www.neherald.com/',
                    imageCard: 'https://www.neherald.com/logo.png',
                    allgallery
                    
                });
            }
            catch{
                res.redirect('/error/404')
            }   
        }




        exports.homeAPI = async(req, res, next) => {
            try{
                const topnews = await allNews.find({ne_insight:'yes'}).sort({news_id:-1}).limit('1').lean();
                const latestnews = await allNews.find({post_topic:{$ne:'headlines'},post_category:{$ne:'article'}}).sort({news_id:-1}).limit('3').lean();

                let ftopNews = [];
                for(var i=0 ;i<topnews.length;i++) {
                      ftopNews.push(topnews[i].post_name);   
                }

                const skipOneTopNews = ftopNews.toString();


                const tripuranews = await allNews.find({post_category:'tripura',post_name:{$ne:skipOneTopNews}}).sort({news_id:-1}).limit('10').lean();
                //const relatedNews = await allNews.find({post_category:catD,post_url:{$ne:nUrl}}).sort({news_id:-1}).limit('5').lean();

                //Tripura All News
                // const tripuranews = await allNews.find({post_category:'tripura',ne_insight:{$ne:'yes'}}).sort({news_id:-1}).limit('5').lean();

                const nationalnews = await allNews.find({post_category:'national'}).sort({news_id:-1}).skip('1').limit('5').lean();
                const nationalone = await allNews.find({post_category:'national'}).sort({news_id:-1}).limit('1').lean();

                const sportnews = await allNews.find({post_category:'sports'}).sort({news_id:-1}).skip('1').limit('4').lean();
                const sportone = await allNews.find({post_category:'sports'}).sort({news_id:-1}).limit('1').lean();

                const globalnews = await allNews.find({post_category:'world'}).sort({news_id:-1}).skip('1').limit('6').lean();
                const globalone = await allNews.find({post_category:'world'}).sort({news_id:-1}).limit('1').lean();
                const globaltwo = await allNews.find({post_category:'world'}).sort({news_id:-1}).limit('3').lean(); 

                const bnews = await breakingNews.find().sort({brnews_id:-1}).limit('5').lean();

                const entertainment = await allNews.find({post_category:'showbiz'}).sort({news_id:-1}).skip('1').limit('5').lean();
                const entertainmentone = await allNews.find({post_category:'showbiz'}).sort({news_id:-1}).limit('1').lean();

                const finance = await allNews.find({post_category:'finance'}).sort({news_id:-1}).skip('1').limit('5').lean();
                const financeone = await allNews.find({post_category:'finance'}).sort({news_id:-1}).limit('1').lean();

                const article = await allNews.find({post_category:'article'}).sort({news_id:-1}).limit('2').lean();
                const spotlight = await allNews.find({post_category:'health'}).sort({news_id:-1}).limit('3').lean();

                const topheadlines = await allNews.find({ne_insight:'yes'}).sort({news_id:-1}).limit('1').lean();
                //const topheadlines = await allNews.find({news_id:'3291'}).sort({news_id:-1}).limit('1').lean();
                
                const gallery = await allGallery.find().sort({gallery_id:-1}).limit('5').lean();
                const skipGallery = await allGallery.find().sort({gallery_id:-1}).skip(1).limit('10').lean();

                //YouTube Fetch
                const fYt = await youtube.find().sort({video_id:-1}).limit('1').lean();
                const fYotube = await youtube.find().sort({video_id:-1}).skip(1).limit('4').lean();

                res.json(
                    tripuranews,
                    topnews,
                    latestnews,
                    nationalnews,
                    sportnews,
                    globalnews,
                    bnews,
                    gallery,
                    skipGallery,
                    topheadlines,
                    spotlight, 
                    entertainment, 
                    finance,
                    article, nationalone, sportone, globalone, globaltwo, entertainmentone, financeone, fYotube,fYt
                );
            }
            catch{
                res.status(500).send({message: error.message || "Error in Homepage"});
            }
        }


        exports.videoDetails = async(req, res) =>{
            try{
                let nUrl = req.params.url;
                let recentVideos = await VideosModel.find({}).sort({videos_id:-1}).limit(8).lean();
                const vDetails = await VideosModel.findOne({videos_url:nUrl}).lean();
                res.render('videos',
                {
                   vDetails, recentVideos  
                });            
            }catch(error){
                res.status(500).send({message: error.message || "Error in Homepage"});
            }
        }
