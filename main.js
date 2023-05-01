var projects_div = document.getElementById('projects');
var projects = {
    items:[
        {
            title:'Book Recommendation Analysis',
            technologies_used:['Python','JavaScript','HTML','CSS','SQL'],
            link:'https://github.com/Akshay6890/Book-Recommendation-Analysis',
            description:'A System to recommend products to authors, publishers, and retailers by providing them with personalized feedback from user reviews.'
        },
        {
            title:'Social Distancing in Real Time',
            technologies_used:['Python','OpenCV'],
            link:'https://github.com/Akshay6890/smart-social-distancing',
            description:'Social distancing in Real-Time using live video stream/IP camera in OpenCV.'
        },
        {
            title:'House Price Prediction',
            technologies_used:['Python'],
            link:'https://github.com/Akshay6890/House-Price-Prediction',
            description:'This app can predict the house price based on some features such as BHK, Sq.Ft., Location etc.'
        },
        {
            title:'Sentiment Analysis',
            technologies_used:['Python','HTML','JavaScript'],
            link:'https://github.com/Akshay6890/Sentiment-Analysis',
            description:'This project is intended to analyze all the reviews collected from users and also we displayed the summarized results in form of a graph.'
        }
    ],
};
for(var i=0;i<projects.items.length;i++){
    var tech_list="";
    for(var j=0;j<projects.items[i].technologies_used.length;j++){
        tech_list+='&#x2022;&nbsp;'+projects.items[i].technologies_used[j]+'&nbsp;&nbsp;';
    }
    projects_div.innerHTML+='<a class="project-item" target="_blank" href="'+projects.items[i].link+'">'+
    '<h1 style="font-size:25px">'+projects.items[i].title+'</h1><br>'+
    '<div style="font-size:15px">'+tech_list+'</div><br>'+
    '<p>'+projects.items[i].description+'</p></a>';
}

window.addEventListener("scroll", function() {
    var elementTarget = document.getElementById("section-header");
    if (window.scrollY >= (elementTarget.offsetTop + elementTarget.offsetHeight)) {
        console.log('hi');
        elementTarget.classList.add('fixed');
    }
    else{
        elementTarget.classList.remove('fixed');
    }
});