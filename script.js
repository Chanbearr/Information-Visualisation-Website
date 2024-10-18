//Chart 1: Line graph displying the rise of social media and tiktok.
const data_source_rise = "rise_of_social_media.csv"; // I modified this set of code from Drew's tutorial and it creates a line graph to showcase the rise of social media

Plotly.d3.csv(data_source_rise, function(rise_data) {

    const unpack = (data, key) => data.map(row => row[key]);

    const amount_of_users = unpack(rise_data, 'All social media');
    const amount_of_tiktok_users = unpack(rise_data, 'Tiktok');
    const year = unpack(rise_data, 'Year');

    const rise_chart_data = [{
        x: year,
        y: amount_of_users,
        type: 'line',
        name: "All social media platforms",
        line: {
            color: '#D6436B'
        }
        ,
    }, {
        x: year,
        y: amount_of_tiktok_users,
        type: 'line',
        name: 'TikTok',
        line: {
            color: '#333'
        }
    }];

    const rise_chart_layout = {
        title: {
            text: 'Rise of social media',
            font: {
                size: 15,
            }
        },
        xaxis: {
            title: 'Year',
            tickmode: 'linear',
            dtick: 1, //this part of code was created with the assistance of ChatGPT
            gridcolor: "F694AF"
        },
        yaxis: {
            title: 'Amount of users (Billion)',
            gridcolor: "F694AF"
        },
        barmode: 'group', 
        font: {
        size: 15,
        },
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        legend: { //The code below is changing the location of the legend in order to be above the graph rather than on the right hand side
            x: 0.5,
            y: 1,
            orientation: 'h',
            xanchor: 'center',
            yanchor: 'bottom',
        }
    };

    Plotly.newPlot('rise_of_social_media', rise_chart_data, rise_chart_layout);
});

//Interaction 1: A selection of buttons for users to interact with. After selecting one option, users are shown pop up text of the estimated amount of time they spend on Tiktok.  
//This section of code was made with the assistance of ChatGPT and was modified according to my vision.
document.querySelectorAll('.time-button').forEach(button => {
    button.addEventListener('click', function() {
        const popup = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        
        let hours = this.textContent.split('-')[0].trim(); // Extract hours from button text
        let message = getMessage(hours);
        
        content.textContent = message;
        popup.style.display = 'block';
        overlay.style.display = 'block';
    });
});

//Below is the function that allows the pop up to show up. After clicking a button they are returned with the following text.
function getMessage(hours) {
    switch(hours) {
        case 'Less than 1 hour':
            return "Your monthly average on TikTok is >30 hours";
        case '1':
            return "Your monthly average on TikTok is about 30 hours";
        case '2':
            return "Your monthly average on TikTok is about 60 hours";
        case '3':
            return "Your monthly average on TikTok is about 90 hours";
        case '4':
            return "Your monthly average on TikTok is about 120 hours.";
        case '5':
            return "Your monthly average on TikTok is about 150 hours.";
        case 'More than 6 hours':
            return "Your monthly average on TikTok is more than 180 hours.";
        default:
            return "";
    }
}

// Chart 2: Column chart on how many users there are on each platform. Used to display the most downloaded social media platform.
// Modified code from week 5 activity from my cereal plot
const data_source_social = "social_media_users.csv";

Plotly.d3.csv(data_source_social, function(social_data) {

    const unpack = (data, key) => data.map(row => row[key]);

    const social_x = unpack(social_data, 'Social Media App');
    const social_y = unpack(social_data, 'How many users');

    // Define properties for each social media platform and assigning each platform with their respective brand colour
    // Retrieved each brandings primary logo colour from https://usbrandcolors.com/facebook-colors/
    // Changed the opacity of the bar color followed by a solid colour border to create less harsh colours and fit the overall webpage aesthetic 
    const social_platforms = {
        "Facebook": { color: "rgba(66, 103, 178, 0.5)", borderColor: "blue" },
        "Youtube": { color: "rgba(255, 0, 0, 0.5)", borderColor: "red" },
        "Whatsapp": { color: "rgba(37, 211, 102, 0.5)", borderColor: "green" },
        "Instagram": { color: "rgba(131, 58, 180, 0.5)", borderColor: "purple" },
        "Tiktok": { color: "rgba(0, 0, 0, 0.5)", borderColor: "black" }
    };

    // Mapping the colors based on the social media platform
    const social_color = social_x.map(platform => social_platforms[platform].color);
    const social_borderColor = social_x.map(platform => social_platforms[platform].borderColor);

    const social_chart_data = [{
        x: social_x,
        y: social_y,
        marker: {
            color: social_color,
            line: { 
                width: 1, 
                color: social_borderColor, // Set border color to match the platform color
            }
        },
        mode: 'markers',
        type: 'bar',
        transforms: [{ type: "groupby", groups: social_x }],
    }];

    const social_chart_layout = {
        title: 'Amount of Users on Social Media',
        xaxis: {
            title: 'Social Media Platform',
        },
        yaxis: {
            title: 'Number of Users (Billion)'
        },
        showlegend: false,
        hovermode: 'closest',
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        width: 800, 
        height: 600
    };

    Plotly.newPlot('social-media-users', social_chart_data, social_chart_layout);
});

// Chart 3: A column graph that displays the social media platforms that users spend the most time on.
// This set of code follows the same structure and colour display as the previous chart.
const time_data_source = "time_spent.csv";

Plotly.d3.csv(time_data_source, function(time_data) {

    const unpack = (data, key) => data.map(row => row[key]);

    const time_x = unpack(time_data, 'Type of social media');
    const time_y = unpack(time_data, 'Time spent on app');

    const time_platforms = {
        "Facebook": { color: "rgba(66, 103, 178, 0.5)", borderColor: "blue" },
        "Youtube": { color: "rgba(255, 0, 0, 0.5)", borderColor: "red" },
        "Snapchat": { color: "rgba((255,252,0, 0.5)", borderColor: "yellow"},
        "Instagram": { color: "rgba(131, 58, 180, 0.5)", borderColor: "purple" },
        "Tiktok": { color: "rgba(0, 0, 0, 0.5)", borderColor: "black" }
    };

    const time_color = time_x.map(platform => time_platforms[platform].color);
    const time_borderColor = time_x.map(platform => time_platforms[platform].borderColor);

    const time_chart_data = [{
        x: time_x,
        y: time_y,
        type: 'bar',
        marker: {
            color: time_color,
            line: {
                width: 1,
                color: time_borderColor
            }
        },
        textposition: 'auto',
        hoverinfo: 'y',
        hovertemplate: '%{x}: %{y} hours<extra></extra>'
    }];

    const time_chart_layout = {
        title: 'Time Spent on Social Media Platforms (in hours per month)',
        xaxis: {
            title: 'Social Media Platform'
        },
        yaxis: {
            title: 'Time Spent (Hours)',
        },
        showlegend: false,
        hovermode: 'closest',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        width: 800,
        height: 600
    };

    Plotly.newPlot('time-spent', time_chart_data, time_chart_layout);
});

// Chart 4: A column graph that displays the demographic distribution of Tiktok. 
const demographic_data_source = "demographic.csv";

Plotly.d3.csv(demographic_data_source, function(demographic_data) {

    const unpack = (data, key) => data.map(row => row[key]);

    const demographic_x = unpack(demographic_data, 'Age Group');
    const demographic_y = unpack(demographic_data, 'Amount of Users');

    const demographic_chart_data = {
        x: demographic_x,
        y: demographic_y,
        type: 'bar',
        marker: {
            color: '#F694AF',
            // Here I change the colour of the bar column '18-24' to highlight the age group with the highest amount of users to draw attention towards it and to support my story.
            color: demographic_x.map(ageGroup => ageGroup === '18-24' ? '#D6436B' : '#F694AF')
        },
        text: demographic_y.map(String),
        textposition: 'auto',
    };

    const demographic_chart_layout = {
        title: 'Demographic on Tiktok',
        xaxis: {
            title: 'Age Group',
        },
        yaxis: {
            title: 'Amount of Users (Billion)',
            gridcolor: '#F694AF'
        },
        showlegend: false,
        hovermode: 'closest',
        //Setting background to transparent. I retrieved this section of code from https://stackoverflow.com/questions/50853447/change-plot-background-color. This was applied throughout all of my charts to allow my charts to blend seamlessly with my webpage.
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)', 
        width: 800,
        height: 600
    };

    Plotly.newPlot('demographic-chart', [demographic_chart_data], demographic_chart_layout); //Originally coded without [] bracket however it would get rid of all my graphs, fixed with ChatGPT
});

// Interaction 2: Hover interaction that shows the display of trending hashtags on Tiktok related to diet.
// Modified code from Chatgpt
// Created two function that allows the text to change once hovered over the box. 
function changeText(element) {
    const text = element.querySelector('h3');
    switch (text.id) {
      case 'diet': // Selects id from html
        text.textContent = '44.8 Billion views on this hashtag'; // the text that it changes to when hovered over
        break;
      case 'health':
        text.textContent = '84.2 Billion views on this hashtag';
        break;
      case 'weightloss':
        text.textContent = '100.5 Billion views on this hashtag';
        break;
      case 'nutrition':
        text.textContent = '15.7 Billion views on this hashtag';
        break;
      case 'weightlosscheck':
            text.textContent = '17.9 Billion views on this hashtag';
            break;
      case 'gymtok':
                text.textContent = '259.4 Billion views on this hashtag';
                break;
    }
  }

  function resetText(element) {
    const text = element.querySelector('h3');
    switch (text.id) {
      case 'diet':
        text.textContent = '#Diet'; // After user leaves hover the text will return to the hashtag text
        break;
      case 'health':
        text.textContent = '#Health';
        break;
      case 'weightloss':
        text.textContent = '#Weightloss';
        break;
      case 'nutrition':
            text.textContent = '#Nutrition';
            break;
      case 'weightlosscheck':
                text.textContent = '#Weightlosscheck';
                break;
      case 'gymtok':
                    text.textContent = '#Gymtok';
                    break;
    }
}

// Chart 5: A column graph that displays the demographic distribution of Tiktok. 
// This set of code was modified from the activity in week 6
const choropleth_data = 'choropleth.csv'
 
const unpack = (data, key) => data.map(row => row[key]);

Plotly.d3.csv(choropleth_data, population_data => {
    const location = unpack(population_data, 'Code');
    const pop_z = unpack(population_data, 'Prevalence');
    const country = unpack(population_data, 'Entity');

    var data = [{
        type: 'choropleth',
        locations: location,
        z: pop_z,
        text: country,
        colorscale: [
            [0, 'rgb(255,229,237)'],
            [0.2, 'rgb(246,148,175)'],
            [0.4, 'rgb(236,108,141)'],
            [0.6, 'rgb(214,77,115)'],
            [0.8, 'rgb((210,80,116)'],
            [1, 'rgb(214,68,108)']
        ],
        marker: {  
            line: {
                color: 'rgb(0,0,0)',
                width: 0.5
            }
        },
        colorbar: { 
            ticksuffix: '%',
            title: 'Population<br>(female)' 
        }
    }];

    var layout = {
        width: 800,
        height: 600,
        title: 'Eating Disorder Prevalance',
        geo: {
            showframe: false,
            projection: {
                type: 'lataxis', // Allowing closer map view that only displays relevant countries
            },
            domain: {
                x: [0, 1],
                y: [0, 1] // Adjust the y-domain to allocate more space for the map
            },
            dragmode: false,
            // making background transparent, sourced this code from https://stackoverflow.com/questions/60056848/how-to-get-rid-of-the-white-background-of-choropleth, adapted it to javascript format
            bgcolor: 'rgba(0,0,0,0)' 
        },
        // Moving title closer choropleth map
        margin: {
            t: 30,
            b: 0
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        //Adding annotation to draw attention to Australia. Code is modified from Week 7 annotation activity.
        // Adjusted arrow position to point towards Australia
        annotations:[ 
            {
                x: 0.85, 
                y: 0.43, 
                xref: 'geo',
                yref: 'geo',
                text: 'Australia is shown to have the highest prevalence at 1.03%', // Changed text display to highlight the prevalence percentage for easy read
                showarrow: true,
                arrowhead: 9,
                arrowcolor: 'rgb(0,0, 0)',
                ax: -150, // Offset arrow head position in pixels (right)
                ay: 150, // Offset arrow head position in pixels (up)
                font: {
                    color: 'rgb(38, 46, 61)'
                }
            }
        ]
    };

    var config = {
        scrollZoom: false // Disabling zoom of the map in order to only focus on relevant countries and avoid constant interactivity.
    };

    Plotly.newPlot("choropleth-chart", data, layout, config);
});

// Chart 6: Column chart that displays the demographic distribution of the Body Dysmorphia Disorder prevalence in Australia
// Used to showcase the prevalence of eating disorders in Australia amongst different age groups
const data_source_age = "age_prevalence.csv" 

Plotly.d3.csv(data_source_age, function(age_data) {
    const unpack = (data, key) => data.map(row => row[key]);

    const age_x = unpack(age_data, 'Age');
    const age_y = unpack(age_data, 'Prevalence');

    const age_chart_data = [{
        x: age_x,
        y: age_y,
        type: 'bar',
        // Utilised similar concept to chart 4 where it highlights certain columns
        // Here is highlights the '15-19' up to '25-29' to show where the prevalence starts to rise
        // Code was made with the assistance of ChatGPT
        marker: {
            color: age_x.map(ageGroup => {
                if (ageGroup === '15-19') return '#D6436B';
                if (ageGroup === '20-24') return '#D6436B';
                if (ageGroup === '25-29') return '#D6436B';
                return '#F694AF'; // Default color for other age groups
            })
        },
        text: age_y.map(String), // Convert the amount of users to strings for hover text
        textposition: 'auto'
    }];

    const age_chart_layout = {
        height: 400,
        width: 500,
        title: {
            text: 'Prevalence of Eating Disorders in Australia by Age Group',
            font: {
                size: 15
            }
        },
        xaxis: {
            title: 'Age Group',
            tickangle: 45,
            gridcolor: 'rgba(0, 0, 0, 0)' //Setting the grid colour to transparent for easy readability and X-Axis is categorical.
        },
        yaxis: {
            title: 'Prevalence (%)',
            gridcolor: '#F694AF' // Only showing the Y-Axis grid lines to allow for easy match up with prevalence percentage on the Y-Axix 
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        };


    Plotly.newPlot('age-chart', age_chart_data, age_chart_layout);
});

//Chart 7: Line graph showing the standardised prevalence of BDD from 1990-2019
// Follows the same structure as Chart 1
const data_source_prevalence = "standardised_prevalence.csv";

Plotly.d3.csv('standardised_prevalence.csv', function(prevalence_data) {
    const prevalence_x = unpack(prevalence_data, 'Year');
    const prevalence_y = unpack(prevalence_data, 'Age-standardized');

    const prevalence_chart_data = [{
        x: prevalence_x,
        y: prevalence_y,
        type: 'line',
        name: "Standardised prevalence 1990-2019",
        line: {
            color: '#D6436B'
        }
    }];

    const prevalence_chart_layout = {
        height: 400,
        width: 500,
        title: {
            text: 'Standardised Prevalence',
            font: {
                size: 15,
            }
        },
        xaxis: {
            title: 'Year',
            tickmode: 'linear',
            tickmode: 'array',
            tickvals: [1990, 2000, 2010, 2019], //Only displaying the relevant years
            gridcolor: 'F694AF'
        },
        yaxis: {
            title: 'Prevalence (%)',
            gridcolor: '#F694AF'
        },
        legend: {
            x: 0.5,
            y: 1.1, 
            orientation: 'h',
            xanchor: 'center',
            yanchor: 'bottom',
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };

    Plotly.newPlot('prevalence-chart', prevalence_chart_data, prevalence_chart_layout);
});