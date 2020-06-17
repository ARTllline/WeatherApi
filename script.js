$(document).ready(function () {
    var curQ = null;

    $.ajax({
        url: 'https://api.ipdata.co?api-key=test',
        success: function (data) {
            console.log(data);

            document.getElementById('curQ').value = data.city;
            curQ = document.getElementById('curQ').value;
            $('#TodayBtn').click();
        },
        error: function () {
            console.log('err');
        }
    })

    function clearAll() {
        $("#Today-div").remove();
        $("#FDayDiv").remove();
        $("#Errordiv").remove();
    }

    $('#curQ').on('keyup', function (e) {
        curQ = document.getElementById('curQ').value
    })

    $('#TodayBtn').on('click', function () {
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${curQ}&appid=5a4883350ad1dda19ed54d0bb6aa870a`,
            success: function (data) {
                clearAll();
                //TODAY
                $('<div>', { id: 'Today-div' }).appendTo('body');
                $('<div>', { id: 'Today-div-curW', class: 'Today-div-curW' }).appendTo('#Today-div');
                $('<div>', { id: 'Today-div-curW-header' }).appendTo('#Today-div-curW');
                $('<h4>', { text: 'CURRENT WEATHER' }).appendTo('#Today-div-curW-header');
                var date = new Date(data.dt * 1000)
                $('<h4>', { text: date.toDateString() }).appendTo('#Today-div-curW-header');
                $('<div>', { id: 'Today-div-curW-content' }).appendTo('#Today-div-curW');

                $('<div>', { id: 'Today-div-hourly' }).appendTo('#Today-div');
                $('<h4>', { text: 'HOURLY' }).appendTo('#Today-div-hourly');

                $('<div>', { id: 'Today-div-nP' }).appendTo('#Today-div');
                $('<h4>', { text: 'NEARBY PLACES' }).appendTo('#Today-div-nP');

                //CUR WEATHER
                $('<div>', { id: 'Today-div-curW-content-1' }).appendTo('#Today-div-curW-content');
                $('<img>', { src: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }).appendTo('#Today-div-curW-content-1');
                $('<p>', { text: data.weather[0].main }).appendTo('#Today-div-curW-content-1');

                $('<div>', { id: 'Today-div-curW-content-2' }).appendTo('#Today-div-curW-content');
                $('<h1>', { text: (Math.round(data.main.temp) - 273) + '℃' }).appendTo('#Today-div-curW-content-2');
                $('<p>', { text: 'Real Feel ' + (Math.round(data.main.temp_max) - 273) + '℃' }).appendTo('#Today-div-curW-content-2');

                $('<div>', { id: 'Today-div-curW-content-3' }).appendTo('#Today-div-curW-content');
                var sunrise = new Date(data.sys.sunrise * 1000)
                var sunset = new Date(data.sys.sunset * 1000)
                var duration = new Date((data.sys.sunset * 1000) - (data.sys.sunrise * 1000))
                $('<p>', { text: 'Sunrise:     ' + sunrise.toLocaleTimeString() }).appendTo('#Today-div-curW-content-3');
                $('<p>', { text: 'Sunset:      ' + sunset.toLocaleTimeString() }).appendTo('#Today-div-curW-content-3');
                $('<p>', { text: 'Duration:   ' + duration.toLocaleTimeString() }).appendTo('#Today-div-curW-content-3');

                //HOURLY
                $.get("http://api.openweathermap.org/data/2.5/forecast",
                    {
                        "q": curQ,
                        "appid": "5a4883350ad1dda19ed54d0bb6aa870a"
                    },
                    function (hourData) {
                        //Hourly
                        $('<div>', { id: 'Today-div-hourly-time' }).appendTo('#Today-div-hourly');
                        $('<div>', { id: 'Today-div-hourly-icon' }).appendTo('#Today-div-hourly');
                        $('<div>', { id: 'Today-div-hourly-forecast' }).appendTo('#Today-div-hourly');
                        $('<hr>', {}).appendTo('#Today-div-hourly');
                        $('<div>', { id: 'Today-div-hourly-temp' }).appendTo('#Today-div-hourly');
                        $('<hr>', {}).appendTo('#Today-div-hourly');
                        $('<div>', { id: 'Today-div-hourly-realFeel' }).appendTo('#Today-div-hourly');
                        $('<hr>', {}).appendTo('#Today-div-hourly');
                        $('<div>', { id: 'Today-div-hourly-wind' }).appendTo('#Today-div-hourly');
                        //HeadTime
                        $('<h5>', { text: 'TODAY', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-time');
                        var curHour = new Date(hourData.list[0].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-time');
                        curHour = new Date(hourData.list[1].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-time');
                        curHour = new Date(hourData.list[2].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-time');
                        curHour = new Date(hourData.list[3].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-time');
                        curHour = new Date(hourData.list[4].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-time');
                        //Images
                        $('<div>', { class: 'hourlyPic' }).appendTo('#Today-div-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + hourData.list[0].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#Today-div-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + hourData.list[1].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#Today-div-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + hourData.list[2].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#Today-div-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + hourData.list[3].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#Today-div-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + hourData.list[4].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#Today-div-hourly-icon');
                        //Forecast
                        $('<p>', { text: 'Forecast', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-forecast');
                        $('<h5>', { text: hourData.list[0].weather[0].main, class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-forecast');
                        $('<h5>', { text: hourData.list[1].weather[0].main, class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-forecast');
                        $('<h5>', { text: hourData.list[2].weather[0].main, class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-forecast');
                        $('<h5>', { text: hourData.list[3].weather[0].main, class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-forecast');
                        $('<h5>', { text: hourData.list[4].weather[0].main, class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-forecast');
                        //Temp
                        $('<p>', { text: 'Temp(℃)', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-temp');
                        $('<h5>', { text: (Math.round(hourData.list[0].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-temp');
                        $('<h5>', { text: (Math.round(hourData.list[1].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-temp');
                        $('<h5>', { text: (Math.round(hourData.list[2].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-temp');
                        $('<h5>', { text: (Math.round(hourData.list[3].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-temp');
                        $('<h5>', { text: (Math.round(hourData.list[4].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-temp');
                        //RealFeel
                        $('<p>', { text: 'RealFeel', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-realFeel');
                        $('<h5>', { text: (Math.round(hourData.list[0].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-realFeel');
                        $('<h5>', { text: (Math.round(hourData.list[1].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-realFeel');
                        $('<h5>', { text: (Math.round(hourData.list[2].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-realFeel');
                        $('<h5>', { text: (Math.round(hourData.list[3].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-realFeel');
                        $('<h5>', { text: (Math.round(hourData.list[4].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-realFeel');
                        //Wind
                        $('<p>', { text: 'Wind(km/h)', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-wind');
                        $('<h5>', { text: hourData.list[0].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-wind');
                        $('<h5>', { text: hourData.list[1].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-wind');
                        $('<h5>', { text: hourData.list[2].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-wind');
                        $('<h5>', { text: hourData.list[3].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-wind');
                        $('<h5>', { text: hourData.list[4].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#Today-div-hourly-wind');
                        console.log(hourData);
                    }
                );

                //NEARBY
                $('<div>', { id: 'Today-div-nP-grid', class: 'grid' }).appendTo('#Today-div-nP');
                $('<div>', { id: 'Today-div-nP-grid-d1' }).appendTo('#Today-div-nP-grid');
                $('<div>', { id: 'Today-div-nP-grid-d2' }).appendTo('#Today-div-nP-grid');
                $('<div>', { id: 'Today-div-nP-grid-d3' }).appendTo('#Today-div-nP-grid');
                $('<div>', { id: 'Today-div-nP-grid-d4' }).appendTo('#Today-div-nP-grid');

                $.get("http://api.openweathermap.org/data/2.5/weather",
                    {
                        "lon": data.coord.lon + 5.8,
                        "lat": data.coord.lat - 8.2,
                        "appid": "5a4883350ad1dda19ed54d0bb6aa870a"
                    },
                    function (nearData) {
                        $('<h4>', { text: nearData.name, class: 'nPTimeText' }).appendTo('#Today-div-nP-grid-d1');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }).appendTo('#Today-div-nP-grid-d1');
                        $('<p>', { text: (Math.round(nearData.main.temp) - 273) + '℃', class: 'nPTimeText' }).appendTo('#Today-div-nP-grid-d1');
                    }
                );
                $.get("http://api.openweathermap.org/data/2.5/weather",
                    {
                        "lon": data.coord.lon + 6,
                        "lat": data.coord.lat - 7.7,
                        "appid": "5a4883350ad1dda19ed54d0bb6aa870a"
                    },
                    function (nearData) {
                        $('<h4>', { text: nearData.name, class: 'nPTimeText' }).appendTo('#Today-div-nP-grid-d2');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }).appendTo('#Today-div-nP-grid-d2');
                        $('<p>', { text: (Math.round(nearData.main.temp) - 273) + '℃', class: 'nPTimeText' }).appendTo('#Today-div-nP-grid-d2');
                    }
                );
                $.get("http://api.openweathermap.org/data/2.5/weather",
                    {
                        "lon": data.coord.lon + 6,
                        "lat": data.coord.lat - 8.7,
                        "appid": "5a4883350ad1dda19ed54d0bb6aa870a"
                    },
                    function (nearData) {
                        $('<h4>', { text: nearData.name, class: 'nPTimeText' }).appendTo('#Today-div-nP-grid-d3');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }).appendTo('#Today-div-nP-grid-d3');
                        $('<p>', { text: (Math.round(nearData.main.temp) - 273) + '℃', class: 'nPTimeText' }).appendTo('#Today-div-nP-grid-d3');
                    }
                );
                $.get("http://api.openweathermap.org/data/2.5/weather",
                    {
                        "lon": data.coord.lon - 8.2,
                        "lat": data.coord.lat + 5.8,
                        "appid": "5a4883350ad1dda19ed54d0bb6aa870a"
                    },
                    function (nearData) {
                        $('<h4>', { text: nearData.name, class: 'nPTimeText' }).appendTo('#Today-div-nP-grid-d4');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }).appendTo('#Today-div-nP-grid-d4');
                        $('<p>', { text: (Math.round(nearData.main.temp) - 273) + '℃', class: 'nPTimeText' }).appendTo('#Today-div-nP-grid-d4');
                    }
                );

                $("#Today-div-curW").animate({
                    height: "130px",
                }, 500);
                $("#Today-div-hourly").animate({
                    height: "300px",
                }, 500);
                $("#Today-div-nP").animate({
                    height: "180px",
                }, 500);

                console.log(data);
            },
            error: function () {
                errorCreate()
            }
        });
    });


    $('#5DayBtn').on('click', function () {
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${curQ}&appid=5a4883350ad1dda19ed54d0bb6aa870a`,
            success: function (data) {
                clearAll();

                $('<div>', { id: 'FDayDiv' }).appendTo('body');
                $('<div>', { id: 'FDayDiv-days' }).appendTo('#FDayDiv');

                //Days
                var curDate = null;
                var curIndex = null;
                for (let index = 0; index < 5; index++) {
                    $('<div>', { id: 'FDayDiv-hourly-div' + index }).appendTo('#FDayDiv-days');
                    switch (index) {
                        case 0:
                            curIndex = 0;
                            break;
                        case 1:
                            curIndex = 5;
                            break;
                        case 2:
                            curIndex = 13;
                            break;
                        case 3:
                            curIndex = 21;
                            break;
                        case 4:
                            curIndex = 29;
                            break;
                        default:
                            break;
                    }
                    curDate = new Date(data.list[curIndex].dt * 1000)
                    var dayName = curDate.toLocaleString('en-us', { weekday: 'long' }).slice(0, 3).toUpperCase();
                    var shortDate = curDate.toLocaleString('en-us', { month: 'long' }).slice(0, 3).toUpperCase();

                    $('<h4>', { text: dayName }).appendTo('#FDayDiv-hourly-div' + index);
                    $('<p>', { text: shortDate + ' ' + curDate.getDate() }).appendTo('#FDayDiv-hourly-div' + index);
                    $('<img>', { src: 'https://openweathermap.org/img/w/' + data.list[curIndex].weather[0].icon + '.png' }).appendTo('#FDayDiv-hourly-div' + index);
                    $('<h2>', { text: (Math.round(data.list[curIndex].main.temp) - 273) + '℃' }).appendTo('#FDayDiv-hourly-div' + index);
                    $('<p>', { text: data.list[curIndex].weather[0].main }).appendTo('#FDayDiv-hourly-div' + index);

                }

                var daysList = document.getElementById("FDayDiv-days");
                for (let index = 0; index < daysList.children.length; index++) {
                    daysList.children[index].addEventListener("click", (e) => {
                        switch (index) {
                            case 0:
                                curIndex = 0;
                                break;
                            case 1:
                                curIndex = 5;
                                break;
                            case 2:
                                curIndex = 13;
                                break;
                            case 3:
                                curIndex = 21;
                                break;
                            case 4:
                                curIndex = 29;
                                break;
                            default:
                                break;
                        }

                        for (let index2 = 0; index2 < daysList.children.length; index2++) {
                            $('#FDayDiv-hourly-div' + index2).css("background-color", "white");
                        }
                        $('#FDayDiv-hourly-div' + index).css("background-color", "rgb(155, 154, 154)");

                        curDate = new Date(data.list[curIndex].dt * 1000)
                        var dayName = curDate.toLocaleString('en-us', { weekday: 'long' }).slice(0, 3).toUpperCase();
                        var shortDate = curDate.toLocaleString('en-us', { month: 'long' }).slice(0, 3).toUpperCase();

                        $('#FDayDiv-div-hourly').remove();

                        $('<div>', { id: 'FDayDiv-div-hourly' }).appendTo('#FDayDiv');
                        $('<div>', { id: 'FDayDiv-hourly' }).appendTo('#FDayDiv-div-hourly');
                        //Hourly
                        $('<div>', { id: 'FDayDiv-hourly-time' }).appendTo('#FDayDiv-hourly');
                        $('<div>', { id: 'FDayDiv-hourly-icon' }).appendTo('#FDayDiv-hourly');
                        $('<div>', { id: 'FDayDiv-hourly-forecast' }).appendTo('#FDayDiv-hourly');
                        $('<hr>', {}).appendTo('#FDayDiv-hourly');
                        $('<div>', { id: 'FDayDiv-hourly-temp' }).appendTo('#FDayDiv-hourly');
                        $('<hr>', {}).appendTo('#FDayDiv-hourly');
                        $('<div>', { id: 'FDayDiv-hourly-realFeel' }).appendTo('#FDayDiv-hourly');
                        $('<hr>', {}).appendTo('#FDayDiv-hourly');
                        $('<div>', { id: 'FDayDiv-hourly-wind' }).appendTo('#FDayDiv-hourly');
                        //HeadTime
                        $('<h5>', { text: dayName + ' ' + shortDate + ' ' + curDate.getDate(), class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-time');
                        var curHour = new Date(data.list[curIndex].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-time');
                        curHour = new Date(data.list[curIndex + 1].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-time');
                        curHour = new Date(data.list[curIndex + 2].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-time');
                        curHour = new Date(data.list[curIndex + 3].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-time');
                        curHour = new Date(data.list[curIndex + 4].dt * 1000)
                        $('<h5>', { text: curHour.toLocaleTimeString(), class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-time');
                        //Images
                        $('<div>', { class: 'hourlyPic' }).appendTo('#FDayDiv-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.list[curIndex].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#FDayDiv-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.list[curIndex].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#FDayDiv-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.list[curIndex].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#FDayDiv-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.list[curIndex].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#FDayDiv-hourly-icon');
                        $('<img>', { src: 'https://openweathermap.org/img/w/' + data.list[curIndex].weather[0].icon + '.png', class: 'hourlyPic' }).appendTo('#FDayDiv-hourly-icon');
                        //Forecast
                        $('<p>', { text: 'Forecast', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-forecast');
                        $('<h5>', { text: data.list[curIndex].weather[0].main, class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-forecast');
                        $('<h5>', { text: data.list[curIndex + 1].weather[0].main, class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-forecast');
                        $('<h5>', { text: data.list[curIndex + 2].weather[0].main, class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-forecast');
                        $('<h5>', { text: data.list[curIndex + 3].weather[0].main, class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-forecast');
                        $('<h5>', { text: data.list[curIndex + 4].weather[0].main, class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-forecast');
                        //Temp
                        $('<p>', { text: 'Temp(℃)', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-temp');
                        $('<h5>', { text: (Math.round(data.list[curIndex].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-temp');
                        $('<h5>', { text: (Math.round(data.list[curIndex + 1].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-temp');
                        $('<h5>', { text: (Math.round(data.list[curIndex + 2].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-temp');
                        $('<h5>', { text: (Math.round(data.list[curIndex + 3].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-temp');
                        $('<h5>', { text: (Math.round(data.list[curIndex + 4].main.temp) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-temp');
                        //RealFeel
                        $('<p>', { text: 'RealFeel', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-realFeel');
                        $('<h5>', { text: (Math.round(data.list[curIndex].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-realFeel');
                        $('<h5>', { text: (Math.round(data.list[curIndex + 1].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-realFeel');
                        $('<h5>', { text: (Math.round(data.list[curIndex + 2].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-realFeel');
                        $('<h5>', { text: (Math.round(data.list[curIndex + 3].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-realFeel');
                        $('<h5>', { text: (Math.round(data.list[curIndex + 4].main.temp_max) - 273) + '℃', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-realFeel');
                        //Wind
                        $('<p>', { text: 'Wind(km/h)', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-wind');
                        $('<h5>', { text: data.list[curIndex].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-wind');
                        $('<h5>', { text: data.list[curIndex + 1].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-wind');
                        $('<h5>', { text: data.list[curIndex + 2].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-wind');
                        $('<h5>', { text: data.list[curIndex + 3].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-wind');
                        $('<h5>', { text: data.list[curIndex + 4].wind.speed + 'ESE', class: 'hourlyTimeText' }).appendTo('#FDayDiv-hourly-wind');

                        $("#FDayDiv-div-hourly").animate({
                            height: "300px",
                            queue: true
                        }, 500);
                        $("#FDayDiv-hourly").animate({
                            queue: true,
                            opacity: 1
                        }, 1000);

                    });
                }
            },
            error: function () {
                errorCreate();
            }
        });
    });

    function errorCreate() {
        clearAll();
        $('<div>', { id: 'Errordiv' }).appendTo('body');
        $('<img>', { src: 'https://media.giphy.com/media/Rkis28kMJd1aE/giphy.gif' }).appendTo('#Errordiv');
        $('<h2>', { class: 'ErrorText', text: curQ + ' could not be found.' }).appendTo('#Errordiv');
        $('<h2>', { class: 'ErrorText', text: 'Please enter a different location.' }).appendTo('#Errordiv');
    }
});
