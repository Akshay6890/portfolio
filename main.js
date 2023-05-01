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
            description:'This project is intended to analyze all the reviews collected from users and display the summarized results in form of a graph.'
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

var skills_div = document.getElementById('skills');
var skills_obj={
    items:[
        {
            title:'Python',
            logo:'<i class="fab fa-python"></i>'
        },
        {
            title:'HTML',
            logo:'<i class="fab fa-html5"></i>'
        },
        {
            title:'JavaScript',
            logo:'<i class="fab fa-js"></i>'
        },
        {
            title:'SQL',
            logo:'<i class="fa fa-database"></i>'
        },
        {
            title:'React',
            logo:'<i class="fab fa-react"></i>'
        },
        {
            title:'Java',
            logo:'<i class="fab fa-java"></i>'
        },
    ],
};

for(var i=0;i<skills_obj.items.length;i++){
    if(i%2!=0){
        skills_div.innerHTML+='<div class="skills-item skills-item-right"><span>'+skills_obj.items[i].logo+'</span><h2>'+skills_obj.items[i].title+'</h2></div>';
    }
    else{
        skills_div.innerHTML+='<div class="skills-item skills-item-left"><span>'+skills_obj.items[i].logo+'</span><h2>'+skills_obj.items[i].title+'</h2></div>';
    }
}

function sectionClick(section_id){
    var x= document.getElementById(section_id);
    x.scrollIntoView(true);
    if(section_id=='main-child-right'){
        document.getElementById('skills-list').classList.remove('active');
        document.getElementById('wins-list').classList.remove('active');
        document.getElementById('projects-list').classList.add('active');
    }
    else if(section_id=='skills'){
        document.getElementById('projects-list').classList.remove('active');
        document.getElementById('wins-list').classList.remove('active');
        document.getElementById('skills-list').classList.add('active');
    }
    else if(section_id=='wins'){
        document.getElementById('skills-list').classList.remove('active');
        document.getElementById('projects-list').classList.remove('active');
        document.getElementById('wins-list').classList.add('active');
    }
}