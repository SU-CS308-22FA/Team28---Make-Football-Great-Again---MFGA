const mongoose = require("mongoose");
const express = require("express");

const cheerio = require("cheerio");
const axios = require("axios");

const GalatasarayUrl = "https://www.transfermarkt.com/fenerbahce-istanbul/startseite/verein/36"
const galatasaray_kadro_data = []
async function getGalatarasayKadro(url){

    try{
        const response = await axios.get(url);
            
        const $=cheerio.load(response.data)

        const kadro = $("tr");
        kadro.each(function(){
            const name= $(this).find(".hide").text();
            const position= $(this).find("tr:nth-child(2) td").text();
            const birth= $(this).find("td:nth-child(4)").text();

           if(name.length > 1){
            
            galatasaray_kadro_data.push({name,position,birth});
           }
           

            

        });
        console.log(galatasaray_kadro_data)
        

           

    }
    catch(err){
        console.log(err);
    }
}

getGalatarasayKadro(GalatasarayUrl);

