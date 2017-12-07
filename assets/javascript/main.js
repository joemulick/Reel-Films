/* Smooth scrolling */

$(document).ready(function() {
            // Global Variables
            // --------------------------------------------------------------------------------------------------------
            var initialPlaylist = [];
            /// Then we need to filter initialPlaylist into filteredPlaylistArrayt
            var filteredPlaylist = [];
            var userProfile = [];
            var counter;
            var genreChoicesArray = ["Action Packed", "Action", "Adventure", "War", "Western", "Light-Hearted", "Animation", "Comedy", "Family", "Musical", "Romance", "Adrenaline Rush", "Crime", "Horror", "Mystery", "Thriller", "Fantastical", "Animation", "Fantasy", "Foreign", "Sci-Fi", "Heavy-Hitters", "Documentary", "Drama", "History"];
            // Arrays of movie filtered titles
            var movieTitleGen = [];
            var movieMainInd = [];
            var movieYear = [];
            var movieImdbRat = [];
            var movieMpaa = [];
            // counters
            var counterP = 1;
            var counterT = 0;
            var counterY = 0;
            var counterR = 0;
            var counterRa = 0;
            // Array lengths
            var movieTitleL = 0;
            var movieMainIndL = 0;
            var movieYearL = 0;
            var movieImbdRatL = 0;
            var playlistName;

            // make number return by imdb votes an movieMainInd array
            var arr;
            // splits arr varialbe at , of movieMainInd array
            var num;
            // int of imbd votes for movieMainInd array
            var numImbdVotes;
            // value of year of movie in movieYear array
            var year;
            // variable to compare whether indie was selected
            var indie = 200000;

            // Counts through the Mpaa array to get titles of movies
            var movieMpaaCounter = 0;
            // holds the videoId to display youtube video
            var videoIdMpaa;

            var config = {
            apiKey: "AIzaSyBZpHDBvw3YUY4coBuentM9OIJPf6GqWs4",
            authDomain: "reel-films.firebaseapp.com",
            databaseURL: "https://reel-films.firebaseio.com",
            projectId: "reel-films",
            storageBucket: "reel-films.appspot.com",
            messagingSenderId: "226828627848"
                                };

            firebase.initializeApp(config);

            // code for the youtube player
            var tag = document.createElement('script');
            var firstScriptTag = document.getElementsByTagName('script')[0];
            var player;

// This is to make the buttons stick when clicked
    $(document).on("click", ".question-buttons", function() {
        $(this).focus().addClass("buttonFocused");
    });

            tag.src = "https://www.youtube.com/iframe_api";

            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // 3. This function creates an <iframe> (and YouTube player)
            //    after the API code downloads.


            function onYouTubeIframeAPIReady() {
                player = new YT.Player('player', {
                    height: '390',
                    width: '640',
                    videoId: videoIdMpaa,
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            }

            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
                event.target.playVideo();
            }

            // 5. The API calls this function when the player's state changes.
            //    The function indicates that when playing a video (state=1),
            //    the player should play for six seconds and then stop.
            var done = false;

            function onPlayerStateChange(event) {
                if (event.data == YT.PlayerState.PLAYING && !done) {
                    done = true;
                }
            }

            function stopVideo() {
                player.stopVideo();
            }

            // FRONT END TO DO - In order for this onclick to work each dropdown item needs to have the class "genre" and a value="genreName"
            $('.genre').on('click', function() {
                // checks to make sure userProfile is empty then adds the value of the drop down genre selected to the empty userProfile array
                if (counter === 0) {
                    $('.button-group').css('display','none');
                    playlistName = $(this).text();
                    userProfile.unshift($(this).val());
                    findTitle();
                    console.log(userProfile);
                    $('#hide-display').css('display', "block");

                    $('.placeholderSidebarLeft').css("display", "none")
                    $('.placeholderSidebarRight').css("display", "none")
                    questionStartFromSecond();
                }

            });

            



                    // function for producing titles
                    function findTitle() {
                        // console.log("START OF MOVIE TITLE");
                        // produce Titles 
                        if (counterP < 18) {
                            queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=a4a27185a8d4d5eda2d9b10434e6cad8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=" + userProfile[0] + "&page=" + counterP;
                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            }).done(function(response) {
                                console.log(counterP);
                                // adds title of movies
                                for (var i = 0; i < response.results.length; i++) {
                                    movieTitleGen.push(response.results[i].title);
                                    console.log("Title: " + response.results[i].title);

                                }
                                counterP++;
                                // total title of movies
                                movieTitleL = movieTitleGen.length;
                                // console.log(movieTitleGen);
                                // console.log(movieTitleL);
                                findTitle();

                            });
                        }
                        // console.log("End of the MOVIE TITLE");
                    } // end of finds the title function

                    function mainIndie() {
                        // console.log("Start of the MainIndie");
                        if (counterT < movieTitleL) {
                            // Filter movie for mainstream and indie
                            var queryURLS = "https://www.omdbapi.com/?t=" + movieTitleGen[counterT] + "&y=&plot=short&r=json";
                            $.ajax({
                                    url: queryURLS,
                                    method: "GET"
                                }).done(function(response) {
                                    // if there is a movie title in this api, it will run
                                    if (response.Response !== "False") {
                                        arr = response.imdbVotes;
                                        // console.log(response);
                                        // console.log(movieTitleGen[counterT]);
                                        num = arr.split(',');
                                        arr = num.join("");
                                        numImbdVotes = parseInt(arr);
                                        // console.log(numImbdVotes);
                                        // console.log(userProfile[1]);
                                        if (indie > userProfile[1]) {
                                            // adds indie films
                                            add(numImbdVotes);
                                        } else {
                                            // adds mainstream film
                                            add2(numImbdVotes);
                                        }
                                    } // end of if statement false
                                    counterT++;
                                    movieMainIndL = movieMainInd.length;
                                    // console.log(movieMainIndL);
                                    mainIndie();

                                })
                                // .error(function(e) {
                                // console.log(e)
                                // })
                                // end of else if statement based on mainstream/indie
                        } // end of the if counter < movie title statement
                        // console.log("End of the MainIndie");
                    } // end of main indie function
                    function yearInterval() {
                        if (counterY < movieMainIndL) {
                            // console.log("start of year interval");
                            // filter movie based on year interval
                            var queryURLS = "https://www.omdbapi.com/?t=" + movieMainInd[counterY] + "&y=&plot=short&r=json";
                            $.ajax({
                                url: queryURLS,
                                method: "GET"
                            }).done(function(response) {
                                year = parseInt(response.Year);
                                console.log(year);
                                console.log(" first input  " + userProfile[2] + " second input " + userProfile[3])
                                if ((year > userProfile[2]) && (year < userProfile[3])) {
                                    movieYear.push(movieMainInd[counterY]);
                                    console.log(movieYear);
                                }
                                counterY++;
                                movieYearL = movieYear.length;
                                console.log(movieYearL);
                                yearInterval();

                            });
                            // end of else if statement for filter by movie year interval
                        }
                        // console.log("End of year Interval");
                    };

                    function movieRating() {
                        if (counterR < movieYearL) {
                            // console.log("start of Movie Rating");
                            // filer movie based on imdb rating
                            var queryURLS = "https://www.omdbapi.com/?t=" + movieYear[counterR] + "&y=&plot=short&r=json";
                            $.ajax({
                                url: queryURLS,
                                method: "GET"
                            }).done(function(response) {
                                if (response.imdbRating !== "Undefined") {
                                    ratings = parseFloat(response.imdbRating);

                                    // add movie within ratings
                                    if (ratings >= userProfile[4] && ratings <= userProfile[5]) {
                                        movieImdbRat.push(movieYear[counterR]);
                                        console.log(movieImdbRat);
                                    }
                                }
                                counterR++;
                                movieImbdRatL = movieImdbRat.length;
                                console.log(movieImbdRatL);
                                movieRating();

                            });
                            // end of else if statement for filter imdb rating
                        } // if movie statement
                        // console.log("End of movie rating");
                    } // end of function movie rating

                    function movieRated() {
                        if (counterRa < movieImbdRatL) {
                            // filter movie based on MPAA ratings
                            // console.log("start of movie rated");
                            var queryURLS = "https://www.omdbapi.com/?t=" + movieImdbRat[counterRa] + "&y=&plot=short&r=json";
                            $.ajax({
                                url: queryURLS,
                                method: "GET"
                            }).done(function(response) {
                                // console.log(response);
                                var rated = response.Rated;
                                if (userProfile.indexOf(rated) !== -1 && (movieMpaa.indexOf(movieImdbRat[counterRa]) === -1)) {
                                    movieMpaa.push(movieImdbRat[counterRa]);
                                }
                                counterRa++;

                                movieRated();

                            });
                        } // end of else if statement for MPAA ratings
                        // console.log("End of movie Rating");
                    } // end of the movie rated function



                    // pushes indie films
                    function add(numImbdVotes) {
                        if (numImbdVotes < 125000) {
                            movieMainInd.push(movieTitleGen[counterT]);
                            // console.log(movieMainInd);
                        }
                    } // end of add function pushes indie films
                    function add2(numImbdVotes) {
                        if (numImbdVotes > 100000) {
                            movieMainInd.push(movieTitleGen[counterT]);
                            // console.log(movieMainInd);
                        }
                    } // end of add2 function adds only mainstream films   



                    function videoRender() {

                        $('#render-div').hide(1000);
                        $('#render-div').empty(1000);
                        $('#render-div').show(1000);
                        $('.space').css("background-color", "gray");
                        $('.placeholderSidebarLeft').css("display", "inline-block");
                        $('.placeholderSidebarRight').css("display", "inline-block");

                        /// MORE JOE CODE -- NEED TO EMPTY MOVIE INFO DIVS EACH TIME ///
                        $('.placeholderSidebarRight').empty();

                        if (counter === 0) {
                            var createDiv = $('<button>').addClass('createButton btn btn-default btn-block').text('Create New Playlist').css('display', "block");
                            $('#playlist-div').prepend($('<hr>'));
                            $('#playlist-div').prepend(createDiv);
                            counter++;
                        }

                        var movieInfoContainer = $('<div>').addClass('movie-info-container').text('MOVIE INFO');
                        var moviePlayerContainer = $('<div>').addClass('movie-player-container ');
                        var moviePlayerDiv = $('<div id="player"></div>').addClass('movie-player-div col-sm-8');
                        var leftArrow = $('<img>').addClass('left-arrow col-sm-2').attr('src', 'assets/images/leftarrow.png');
                        var rightArrow = $('<img>').addClass('right-arrow col-sm-2').attr('src', 'assets/images/rightarrow.png');
                        var textBetweenArrows = $('<p>').text("Previous / Next Trailer").addClass('text-between-arrows');


                        //////////////////////////////////////////////////////////////////////////////////////

                        /* Joe's code addition to render current movie stats to video render screen */
                        var queryURLS = "https://www.omdbapi.com/?t=" + movieMpaa[movieMpaaCounter];

                        $.ajax({
                            url: queryURLS,
                            method: "GET"
                        }).done(function(response) {

                            var movieTitle = response.Title;
                            var movieSummary = response.Plot;
                            var runTime = response.Runtime;
                            var releaseYear = response.Released;
                            var movieAssociationRating = response.Rated;
                            if(response.Ratings[0]){
                            var sourceVal1 = response.Ratings[0].Source;
                            var tomatoRating = response.Ratings[0].Value;
                            }
                            if(response.Ratings[1]){
                            var sourceVal2 = response.Ratings[1].Source;    
                            var metaRating = response.Ratings[1].Value;
                            };
                            var poster = response.Poster;

                            // Appending items to movieInfoContainer (top container)
                            var movieTitleText = $('<p>').addClass('movie-title-text').text(movieTitle);
                            movieInfoContainer.prepend(movieTitleText);
                            console.log(response);
                            var movieSummaryText = $('<p>').addClass('movie-summary-text').text(movieSummary);
                            movieInfoContainer.append(movieSummaryText);

                            // Appending Runtime, Release Date, rottem tomato score, metacritic score and poster // 

                            var runTimeText = $('<p>').addClass('run-time-text').text('Runtime: ' + runTime).css("align", "left");
                            $('.placeholderSidebarRight').prepend(runTimeText);

                            var releaseYearText = $('<p>').addClass('release-year-text').text('Release Year: ' + releaseYear).css("align", "left");
                            $('.placeholderSidebarRight').append(releaseYearText);

                            var movieAssociationRatingText = $('<p>').addClass('movie-association-rating-text').text('Rated: ' + movieAssociationRating).css("align", "left");
                            $('.placeholderSidebarRight').append(movieAssociationRatingText);


                            // Rotten Tomatoe and Metacritic Rating stuff ///////////////////////////////////////////////////// 
                            var ratingsDiv = $('<div>').addClass('ratings-div');
                            var textRatings = $('<p>').text("Reviews:").addClass('review-title');

                            ratingsDiv.prepend(textRatings);

                            // check rotten tomatoe rating exists
                            if(tomatoRating){
                            var tomatoDiv = $('<div>').addClass('review-container').css('display', 'inline-block');

                            var tomatoText = $('<p>').addClass('tomato-text').text(sourceVal1 + ": " + tomatoRating);
                            tomatoDiv.append(tomatoText);
                             };

                             // check meta rating exists
                             if(metaRating){
                            var metaDiv = $('<div>').addClass('review-container').css('display', 'inline-block');

                            var metaText = $('<p>').addClass('meta-text').text(sourceVal2 + ": "+ metaRating);
                            metaDiv.append(metaText);
                            }
                            

                            ratingsDiv.append(tomatoDiv);
                            ratingsDiv.append(metaDiv);

                            $('.placeholderSidebarRight').append(ratingsDiv);

                            // Poster (its basically an image link/////////////////////////////////////////////////////////////////

                            var posterImage = $('<img>').addClass('poster-image').attr('src', poster).attr("width", "90%");
                            $('.placeholderSidebarRight').append(posterImage);

                        }); //// JOES NEW CODE END


                        moviePlayerContainer.prepend(moviePlayerDiv);

                        $('#render-div').prepend(movieInfoContainer);
                        $('#render-div').append(leftArrow);

                        $('#render-div').append(moviePlayerContainer);

                        // $('#render-div').append(textBetweenArrows);
                        $('#render-div').append(rightArrow);

                        makeAjax(movieMpaaCounter);

                    }

                     function previousVideo(){
                        if(movieMpaaCounter !== 0){
                            movieMpaaCounter--;
                            videoRender();
                        } 

                    }; // end of previous video function

                    function nextVideo(){
                        movieMpaaCounter++;
                        videoRender();
                    }; // end of next video function

                    function makeAjax(i) {
                        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=" + movieMpaa[i] + "&regionCode=US&safeSearch=moderate&type=video&videoCategoryId=30&key=AIzaSyADtMP3eVgiTcTPqx4W8qXgkAZtillp_UI";

                        $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            // After data comes back from the request
                            .done(function(response) {
                                console.log(response);
                                videoIdMpaa = response.items[0].id.videoId;
                                onYouTubeIframeAPIReady();
                                // console.log(videoIdMpaa);
                                // console.log(typeof videoIdMpaa);
                            });
                    };


                    // This butoon creates a new playlist if the user clicks on the create new playlist button OR is new to the site
                    function createNewPlaylist() {

                        // Arrays of movie filtered titles
                        userProfile = [];
                        movieTitleGen = [];
                        movieMainInd = [];
                        movieYear = [];
                        movieImdbRat = [];
                        movieMpaa = [];
                        // counters
                        counterP = 1;
                        counterT = 0;
                        counterY = 0;
                        counterR = 0;
                        counterRa = 0;
                        // Array lengths
                        movieTitleL = 0;
                        movieMainIndL = 0;
                        movieYearL = 0;
                        movieImbdRatL = 0;
                        console.log("test")
                        $('.space').css("background-color", "#F4EADE");
                        $('#render-div').hide();
                        $('#render-div').empty();
                        $('.placeholderSidebarLeft').hide();
                        $('.placeholderSidebarRight').hide();
                        $('#render-div').show(1000);
                        $('moviePlayerDiv').empty();


                        var genreChoicesArray = ["Action Packed", "Action", "Adventure", "War", "Western", "Light-Hearted", "Animation", "Comedy", "Family", "Musical", "Romance", "Adrenaline Rush", "Crime", "Horror", "Mystery", "Thriller", "Fantastical", "Animation", "Fantasy", "Foreign", "Sci-Fi", "Heavy-Hitters", "Documentary", "Drama", "History"];
                        var genreNumberArray = ["Action Packed", 28, 12, 10752, 37, "Light-Hearted", 16, 35, 10751, 10402, 10749, "Adrenaline Rush", 80, 27, 9648, 53, "Fantastical", 16, 14, 10769, 878, "Heavy-Hitters", 99, 18, 36];
                        var questionOneDiv = $('<div>').addClass('question-one-div questions-here');

                        var questionOneText = $('<p>').addClass('question-one-text').text('Choose a genre');
                        var questionOneButtonContainer = $('<div>').addClass('question-one-button-div');

                        // This is going to loop through the genreChoicesArray and it till print the various buttons with their respective attributes, it will prints them in a way so that
                        // The titles of the row get printed without a class so that they cannot be clicked. 
                        for (var i = 0; i < genreChoicesArray.length; i++) {
                            if (i === 0 || i === 5 || i === 11 || i === 16 || i === 21) {

                                if (i !== 0) {
                                    var space = $('<br>').css('display', 'block');
                                    questionOneButtonContainer.append(space);
                                }

                                var title = $('<h4>').addClass('title').text(genreChoicesArray[i] + ": ").css("display", "inline-block");
                                questionOneButtonContainer.append(title);

                            } else {

                                var button = $('<button>').addClass('genre-buttons-question-one btn btn-default').text(genreChoicesArray[i]).attr('value', genreNumberArray[i]);
                                questionOneButtonContainer.append(button);

                            }
                        }

                        questionOneDiv.append(questionOneButtonContainer);

                        $('#render-div').append(questionOneDiv);


                        /////////////////if (counter === 0) {

                            $(document).on("click", ".genre-buttons-question-one", function() {
                                playlistName = $(this).text();
                                // checks to make sure userProfile is empty then adds the value of the drop down genre selected to the empty userProfile array
                                userProfile.unshift(parseInt($(this).val()));
                                console.log("userProfile array after button click, before questionStartFromSecond(): " + userProfile);
                                findTitle();
                                questionStartFromSecond();


                            });
                        ////////////////////////////////////} //If Statement with counter
                        counter = 1;
                    } // End Create Playlist Function




                    // This line will look for any playlists added and will change the playlist when clicked
                    $(document).on("click", ".createButton", createNewPlaylist);
                    $(document).on("click",".left-arrow",previousVideo);
                    $(document).on("click",".right-arrow",nextVideo);
                    $(document).on("click", ".question-four-button", function() {

                        if ($(this).val() == "any") {
                            userProfile.push(1);
                            userProfile.push(10);
                            movieRating();
                            $('#render-div').hide();
                            $('#render-div').empty();
                            console.log(userProfile);
                            questionFive();
                        }
                        if ($(this).val() == "bad") {
                            userProfile.push(1);
                            userProfile.push(7);
                            movieRating();
                            $('#render-div').hide();
                            $('#render-div').empty();
                            console.log(userProfile);
                            questionFive();
                        }
                        if ($(this).val() == "crowd") {
                            userProfile.push(3);
                            userProfile.push(9);
                            movieRating();
                            $('#render-div').hide();
                            $('#render-div').empty();
                            console.log(userProfile);
                            questionFive();
                        }
                        if ($(this).val() == "critic") {
                            userProfile.push(7);
                            userProfile.push(10);
                            movieRating();
                            $('#render-div').hide();
                            $('#render-div').empty();
                            console.log(userProfile);
                            questionFive();
                        }

                        /*
                        userProfile.push($(this).val());
                        console.log(userProfile);
                        $('#render-div').hide();
                        $('#render-div').empty();
                        questionFive();*/
                    })

                });