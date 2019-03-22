/* ================================
Week 7 Assignment: Midterm Functions + Signatures
================================ */
// Setting up Leaflet
var map = L.map('map', {
  center: [39.950389, -75.163871],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


// Call the datasets
var dataset = "https://raw.githubusercontent.com/rharto/cpln692-week7/master/GSI_Public_Projects_Street.geojson";
console.log("you have a dataset");

//loop over every slide in the slide deck and add to html


// Define: myStyle
var myStyle = function(feature) {
  if (feature.properties.SMP_TREETRENCH >= 1) {
    return {
      color: "green",
      weight: 4,
      opacity: 0.5,
    };
  } else if (feature.properties.SMP_RAINGARDEN >= 1) {
    return {
      color: "yellow",
      weight: 4,
      opacity: 0.7,
  };
} else {
    return {
      color: "black",
      weight: 4,
      opacity: 0.5,
    };
}};

// Switch the slides
var slides = [
  {
   title: "Green Stormwater Infrastructure in Philly",
   text: "The City of Philadelphia is nationally reknowned for their stormwater program. Called Green City, Clean Waters, it serves as an example for how small steps can make a big impact. Such a widespread, varied program also makes their stormwater collection more robust.",
   coordinates: [39.950389, -75.163871],
   zoom: 12
 },{
   title: "Rain Gardens",
   text: "Rain gardens throughout the city help to absorb extra water from being input into the combined sewer system, helping to prevent overflows. However, despite their visual and functional appeal, they tend to be less used than other infrastructure. This neighborhood in Northern Liberties shows a good example of their usage.",
   coordinates: [39.965307, -75.147794],
   zoom: 16
   },
  {
   title: "Tree Trenches",
   text: "A more commonly used form of infrastructure is tree trenches. These can be easier to locate, as they can work into the city's existing tree pits. North of campus, many of these can be found.",
   coordinates: [39.962978, -75.202298],
   zoom: 16},
  {
   title: "Opportunity: Center City",
   text: "However, some parts of the city are strikingly bare. One such area is Center City - infrastructure here seems to stop cold at the borders. The parkway has infiltration storage trenches, but there is no other public infrastructure. The city should take advantage of the wide roads and highly maintained districts to implement more infrastucture.",
   coordinates: [39.950389, -75.162902],
   zoom: 15},
  {
   title: "Conclusion",
   text: "While there are opportunities within the city, the program has been wildly successful- as this colorful map clearly shows. Much of the city has some sort of coverage. Step by step, the Water Department will hopefully help fill in the rest of the gaps - and continue to set an example for other cities.",
   coordinates: [39.950389, -75.163871],
   zoom: 12
   }
];
var currentSlide = 0;

var addTitle = (title) => {
  $('.sidebar').append(`<h1 id='title'>${title}</h1>`);
};

var addText = (text) => {
  $('.sidebar').append(`<p id='text'>${text}</p>`);
};

var setColor = (color) => {
  $('#map').css('background-color', color);
};

var cleanup = () => {
  $('#title').remove();
  $('#text').remove();
};

var buildSlide = (slideObject) => {
  cleanup();
  addTitle(slideObject.title);
  addText(slideObject.text);
  setColor(slideObject.color);
  if (slideObject.coordinates && slideObject.zoom) {
    console.log("you have coordinates!");
    map.flyTo(slideObject.coordinates, slideObject.zoom);
  }
};

//Go forward
buildSlide(slides[currentSlide]);
$("#next").click(() => {
  if (currentSlide < slides.length -1) {
    currentSlide = currentSlide + 1;
    buildSlide(slides[currentSlide]);
  }
  if (currentSlide == 0) {
    $('#back').css('display', 'none');
    $('#next').css('display', 'initial');
  } else if (currentSlide == slides.length -1) {
    $('#back').css('display', 'initial');
    $('#next').css('display', 'none');
  } else {
    $('#back, #next').css('display', 'initial');
  }
});

//Go back
buildSlide(slides[currentSlide]);
$("#back").click(() => {
  if (currentSlide > 0) {
    currentSlide = currentSlide - 1;
    buildSlide(slides[currentSlide]);
  }
  if (currentSlide == 0) {
    $('#back').css('display', 'none');
    $('#next').css('display', 'initial');
  } else if (currentSlide == slides.length -1) {
    $('#back').css('display', 'initial');
    $('#next').css('display', 'none');
  } else {
    $('#back, #next').css('display', 'initial');
  }
});

// Define: myFilte
var myFilter = function(feature) {
  return true;
};

// Read the data
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);
    featureGroup.eachLayer(function(layer) {
      console.log(layer);
      layer.bindPopup("<h3>Location:</h3> " +'</p>'+ layer.feature.properties.PROJECTNAME);
    });
    console.log("you have read something");
  });
});
