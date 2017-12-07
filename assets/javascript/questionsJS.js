            var initialPlaylist = [];
            /// Then we need to filter initialPlaylist into filteredPlaylistArrayt
            var filteredPlaylist = [];
            var userProfile = [];
            var counter = 0;
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

function questionStartFromSecond() {

                $('#render-div').hide();
                $('#render-div').empty();
                $('#render-div').show(2000);

                var questionTwoDiv = $('<div>').addClass('question-two-div questions-here');


                var questionTwoButtonDiv = $('<div>').addClass('question-two-button-div');
                var questionTwoText = $('<p>').addClass('question-two-html').text("Would you like a mainstream movie or indie movie?") /*.css('display',block)*/ ;
                var questionTwoButtonIndie = $('<button>').addClass('question-two-button question-buttons btn btn-default btn-block').text("Sleeper Hits").attr("value", "199999");
                var questionTwoButtonMainstream = $('<button>').addClass('question-two-button question-buttons btn btn-default btn-block').text("Blockbusters").attr("value", "200001");

                questionTwoButtonDiv.append(questionTwoButtonIndie);
                questionTwoButtonDiv.append(questionTwoButtonMainstream);
                questionTwoDiv.prepend(questionTwoText);
                questionTwoDiv.append(questionTwoButtonDiv);

                $('#render-div').append(questionTwoDiv);

                // Once the user clicks the rendered buttons (indie / mainstream) the value of the button will be pushed to the array (userPlaylist) as the 2nd element in the array
                // The div will fade out and once its faded out completely the div will be emptyed and will be ready for the next question to be populated inside. 

                if (counter === 0) {
                    $(document).on("click", ".question-two-button", function() {

                        // Why is this pushing twice (the entire function is running twice)
                        userProfile.push(parseInt($(this).val()));

                        mainIndie();
                        $('#render-div').hide();
                        $('#render-div').empty();

                        questionThree();
                    })
                } /*If statement ends here*/
            } /*Question Start From here ends here */

            function questionThree() {

                $('#render-div').show(2000);

                var questionThreeDiv = $('<div>').addClass('question-three-div questions-here');
                var questionThreeButtonDiv = $('<div>').addClass('question-three-button-div');
                var questionThreeText = $('<p>').addClass('question-three-html').text("Pick the year range") /*.css('display',block)*/ ;
                var buttonRangeOne = $('<button>').addClass('question-three-button question-buttons btn btn-default btn-block').text('1970').attr("value", "1970");
                var buttonRangeTwo = $('<button>').addClass('question-three-button question-buttons btn btn-default btn-block').text('1990').attr("value", "1990");
                var buttonRangeThree = $('<button>').addClass('question-three-button question-buttons btn btn-default btn-block').text('2000').attr("value", "2000");
                var buttonRangeFour = $('<button>').addClass('question-three-button question-buttons btn btn-default btn-block').text('Current').attr("value", "2017");


                // Combine content and render to page
                questionThreeButtonDiv.prepend(buttonRangeOne);
                questionThreeButtonDiv.append(buttonRangeTwo);
                questionThreeButtonDiv.append(buttonRangeThree);
                questionThreeButtonDiv.append(buttonRangeFour);

                questionThreeDiv.prepend(questionThreeText);
                questionThreeDiv.append(questionThreeButtonDiv);

                $('#render-div').append(questionThreeDiv);
                if (counter === 0) {
                    $(document).on("click", ".question-three-button", function() {

                        userProfile.push(parseInt($(this).val()));
                        // console.log(userProfile[2]);
                        // console.log(userProfile[3]);
                        console.log(userProfile);

                        if (userProfile.length == 4) {

                            if (userProfile[userProfile.length - 1] > userProfile[userProfile.length - 2]) {
                                $('#render-div').hide();
                                $('#render-div').empty();
                                yearInterval();
                                questionFour();
                                console.log(userProfile);
                            } else {

                                var a = userProfile[userProfile.length - 1];
                                userProfile[userProfile.length - 1] = userProfile[userProfile.length - 2];
                                userProfile[userProfile.length - 2] = a;

                                $('#render-div').hide();
                                $('#render-div').empty();
                                console.log(userProfile);
                                yearInterval();
                                questionFour();
                            }
                        }

                    })
                } // end of counter if statement
            }

            function questionFour() {
                $('#render-div').show(2000);

                var questionFourDiv = $('<div>').addClass('question-four-div questions-here');
                var questionFourButtonDiv = $('<div>').addClass('question-four-button-div');
                var questionFourText = $('<p>').addClass('question-three-html').text("What caliber of movie would you like to see?") /*.css('display',block)*/ ;
                var buttonCriticOne = $('<button>').addClass('question-four-button question-buttons btn btn-default btn-block').text('I dont care').attr("value", "any");
                var buttonCriticTwo = $('<button>').addClass('question-four-button question-buttons btn btn-default btn-block').text('Bad Movies ONLY').attr("value", "bad");
                var buttonCriticThree = $('<button>').addClass('question-four-button question-buttons btn btn-default btn-block').text('Crowd Pleasers').attr("value", "crowd");
                var buttonCriticFour = $('<button>').addClass('question-four-button question-buttons btn btn-default btn-block').text('Critically Acclaimed').attr("value", "critic");

                questionFourDiv.prepend(questionFourText);

                questionFourButtonDiv.prepend(buttonCriticOne);
                questionFourButtonDiv.append(buttonCriticTwo);
                questionFourButtonDiv.append(buttonCriticThree);
                questionFourButtonDiv.append(buttonCriticFour);

                questionFourDiv.append(questionFourButtonDiv);

                $('#render-div').append(questionFourDiv);
                
            }

            function questionFive() {
                $('#render-div').show(2000);

                // QUESTION 3 IS FILTER BY YEAR RANGE
                // Create Content
                var questionFiveDiv = $('<div>').addClass('question-five-div questions-here');
                var questionFiveButtonDiv = $('<div>').addClass('question-five-button-div');
                var questionFiveText = $('<p>').addClass('question-five-html').text("Select Movie Association Ratings:") /*.css('display',block)*/ ;
                var buttonRatingOne = $('<button>').addClass('question-five-button question-buttons btn btn-default btn-block').text('G').attr("value", 'G');
                var buttonRatingTwo = $('<button>').addClass('question-five-button question-buttons btn btn-default btn-block').text('PG').attr("value", 'PG');
                var buttonRatingThree = $('<button>').addClass('question-five-button question-buttons btn btn-default btn-block').text('PG-13').attr("value", 'PG-13');
                var buttonRatingFour = $('<button>').addClass('question-five-button question-buttons btn btn-default btn-block').text('R').attr("value", 'R');
                var buttonStart = $('<button>').addClass('start submit-button btn btn-success btn-block').text('Start Watching Trailers').css('display', "block");


                var nameYourPlaylistDiv = $('<input>').attr({ "id": "playlist-name", "placeholder": "Name Your Playlist" });
                var namePlaylistValue = nameYourPlaylistDiv.val().trim();
                console.log(namePlaylistValue);

                // Name of the playlist
                var nameYourPlaylistDiv = $('<input>').attr({
                    "id": "playlist-name",
                    "placeholder": "Name Your Playlist"
                });
                namePlaylistValue = nameYourPlaylistDiv.val().trim();
                console.log(namePlaylistValue);

                questionFiveDiv.prepend(questionFiveText);

                questionFiveButtonDiv.prepend(buttonRatingOne);
                questionFiveButtonDiv.append(buttonRatingTwo);
                questionFiveButtonDiv.append(buttonRatingThree);
                questionFiveButtonDiv.append(buttonRatingFour);
                questionFiveButtonDiv.append(namePlaylistValue);
                questionFiveButtonDiv.append(buttonStart)
                questionFiveDiv.append(questionFiveButtonDiv);

                $('#render-div').append(questionFiveDiv);

                if (counter === 0) {
                    $(document).on("click", ".question-five-button", function() {

                        if (userProfile.length < 10) {
                            counterRa = 0;
                            userProfile.push($(this).val());
                            console.log(userProfile);
                            movieRated();

                        }

                    }); // end of docutment click question


                    $(document).on("click", ".start", function() {
                                // Only if at least one rating option has been selected
                                if (userProfile.length >= 7) {
                                    console.log("start was clicked");
                                    $('#render-div').hide();
                                    $('#render-div').empty();



                                    videoRender();
                                }
                                    var database = firebase.database();

                                    var pushed = database.ref().push({
                                        PlaylistArray: movieMpaa
                                    }); // end of the database push 
                                    console.log(pushed);
                                    id = pushed.key;
                                    console.log(id);
                                 // gives us the key value
                                    database.ref().on("child_added", function(snapshot) {

                                    // Change the HTML to reflect
                                    console.log(snapshot.val());
        
                                     }); // end of snapshot
                                }); // end of the start function
                            } //end of the counter if statement

                            
                            // CREATE NEW PLAYLIST DIV (THIS CREATES )
                            
                            var createNewPlaylistDiv = $('<div>').addClass('create-new-playlist-div');
                            var addNewDiv = $('<div>').addClass('new-playlist-div');
                            var genreNumToString = userProfile[0]; console.log("This console.log should show the genre selected as a string: " + genreChoicesArray[genreNumToString]);
                            
                            var genreText = $('<button>').addClass('genre-text btn btn-warning btn-block').attr('data-id',"id").text("Playlist: " + playlistName /*genreChoicesArray[genreNumToString]*/ ).css('display', "block");

                            addNewDiv.append(genreText); 
                            createNewPlaylistDiv.append(genreText); 
                            createNewPlaylistDiv.append(addNewDiv); 
                            $('#playlist-div').append(createNewPlaylistDiv);



                            ////////} /* If counter statement end */

                            $('#playlist-div').append(createNewPlaylistDiv);

                        } // Question 5 end function