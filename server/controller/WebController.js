const { request } = require('express');
var express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { resolve } = require('path');
//const { rejects } = require('assert');
const { all } = require('express/lib/application');
const { assert, error } = require('console');
const fetch = require('node-fetch');
const _ = require('lodash');
const { title } = require('process');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
var moment = require('moment'); // require

//Database Connection
require('../model/database');

//Model Requirement
const TestOnePost =  require('../model/testone');
const PanchangModel = require('../model/panchangs');
const PandeetModel = require('../model/pandeet');
const VideosCategory = require('../model/videos_categories');
const MusicCategoryModel = require('../model/music_categories');
const HoroscopeModel = require('../model/horoscope');
const VideosModel = require('../model/kytvideos');
const BlogsModel = require('../model/blogs');
const newDate = moment().format('lll');


    //Pandeet Database Page
    exports.pandeetPage = async(req, res) =>{
        const pandeetName = await PandeetModel.find({}).lean();
        res.render('pandeet_add',{
            pandeetName
        });
    }
    exports.videosPage = async(req, res) =>{
        const vCname = await VideosCategory.find({}).lean();
        res.render('videos_add',{
            vCname
        });
    }
    exports.addVc = async(req, res) =>{
        res.render('vcategory_add');
    }
    exports.mCategoryPage = async(req, res) =>{
        res.render('mcategories_add');
    }
    exports.musicPage = async(req, res) =>{
        const MusicCate = await MusicCategoryModel.find({}).lean();
        res.render('music_add',{
            MusicCate
        })
    }
    exports.mantraPage = async(req, res) =>{
        res.render('mantras');
    }

    exports.mantraCategoriesPage = async(req, res) =>{
        res.render('mantras_categories');
    }

    exports.wishesPage = async(req, res) =>{
        res.render('wishes');
    }

    exports.podcastPage = async(req, res) =>{
        res.render('podcast');
    }

    exports.horoscopePage = async(req, res) =>{
        const horoscope = await HoroscopeModel.find({}).sort({horoscope_id:-1}).lean();
        res.render('horoscope',{
            horoscope
        });
    }

    exports.horoscopeDetails = async(req, res) =>{
        const url = req.params.url;
        const horoscope = await HoroscopeModel.findOne({horoscope_url:url}).lean();
        const latest_horoscope = await HoroscopeModel.find().sort({horoscope_id:-1}).lean();
        res.render('horoscope_details',{
            horoscope,latest_horoscope
        });
    }

    exports.panchangPage = async(req, res) =>{
        const panchang = await PanchangModel.findOne({publish_date:'27/06/2023'}).limit(1).lean();
        res.render('panchang',{
            panchang
        });
    }

    exports.videosPage = async(req, res) =>{
        res.render('videos');
    }

    exports.blogsPage = async(req, res) =>{
        const blg = await BlogsModel.find({}).sort({blogs_id:-1}).lean();
        res.render('blogs',{
            blg
        });
    }

    exports.cateVideos = async(req, res) =>{
        const catId = req.params.category;
        try {
          const getVideos = await VideosModel.find({ videos_category: catId }).sort({ videos_id: -1 }).lean();
          const getCategory = await VideosCategory.findOne({ categoriesId: catId }).lean();
          
          if (!getCategory) {
            // Handle the case when no category is found
            console.log("Category not found");
            // You can choose to send an appropriate response or redirect to an error page
            return res.status(404).send('Category not found');
          }
        
          console.log(getCategory.vcategories_title);
          const hh = getCategory.vcategories_title;
          res.render('vcategories', {
            getVideos: getVideos,
            hh: hh
          });
        } catch (error) {
          // Handle any errors that occurred during the database queries or rendering
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        
    }
    
    exports.bdetails =  async(req, res) =>{
        const urlx = req.params.url;
        const latest_blogs = await BlogsModel.find({}).sort({blogs_id:-1}).limit('3').lean();
        const bd = await BlogsModel.findOne({url:urlx}).lean();
        res.render('blogsdetails',{
            bd,latest_blogs
        })
    }



    
    
    
    



  




