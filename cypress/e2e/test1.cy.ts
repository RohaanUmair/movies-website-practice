describe('template spec', () => {
  beforeEach(() => {
    Cypress.config('scrollBehavior', false);
    cy.viewport(1180, 680);
  })

  // it('passes', () => {
  //   cy.visit('localhost:3000/login')
  // })

  // it('checking login form', () => {
  //   cy.visit('localhost:3000/login')

  //   cy.get('#login-text')
  //     .should('exist')
  //     .should('have.text', 'Login')

  //   cy.get('#login-email')
  //     .should('exist')

  //   cy.get('#login-pass')
  //     .should('exist')

  //   cy.get('#login-btn')
  //     .should('exist')
  //     .should('have.text', 'Login In')


  //   cy.get('#login-email')
  //     .type('abcd@email.com')

  //   cy.get('#login-btn')
  //     .click()

  //   cy.get('#login-email')
  //     .clear()


  //   cy.get('#login-pass')
  //     .type('123123')

  //   cy.get('#login-btn')
  //     .click()

  //   cy.get('#login-pass')
  //     .clear()
  // })


  it('Submit login form', () => {
    cy.clearCookies();
    cy.visit('localhost:3000/signup')

    cy.intercept('GET', '/api/like-movie', {
      statusCode: 200,
      body: {
        "data": {
          "_id": "1234567890asdfghjkl12345678",
          "email": "abcd@email.com",
          "accType": "kids",
          "__v": 0,
          "likedMoviesArr": [
            "Captain America: Brave New World"
          ]
        }
      }
    }).as('getLikedMovieAPI')


    cy.get('#otp-email')
      .should('exist')
      .type('abcd@email.com')

    cy.get('#otp')
      .should('exist')

    cy.get('#send-otp-btn')
      .should('have.text', 'Send OTP')


    cy.visit('localhost:3000/login')

    cy.get('#login-text')
      .should('exist')
      .should('have.text', 'Login')

    cy.get('#login-email')
      .should('exist')

    cy.get('#login-pass')
      .should('exist')

    cy.get('#login-btn')
      .should('exist')
      .should('have.text', 'Login In')


    cy.get('#login-email')
      .type('abcd@email.com')

    cy.get('#login-btn')
      .click()

    cy.get('#login-email')
      .clear()


    cy.get('#login-pass')
      .type('123123')

    cy.get('#login-btn')
      .click()

    cy.get('#login-pass')
      .clear()


    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { message: 'Logged In' }
    }).as('loginAPI');


    cy.get('#login-email')
      .type('abcd@email.com')

    cy.get('#login-pass')
      .type('123123')

    cy.get('#login-btn')
      .should('have.text', 'Login In')
      .click()

    cy.wait('@loginAPI');


    cy.setCookie("user", "TestUser");
    cy.setCookie("userEmail", "abcd@email.com");
    cy.setCookie("accNames", JSON.stringify(['kids']));
    cy.setCookie("accAvatars", JSON.stringify([]));

    cy.wait(1000)


    cy.intercept('GET', '/api/addProfile', {
      statusCode: 200,
      body: {
        data: {
          _id: "1234567890asdfghjkl12345678",
          username: "TestUser",
          email: "abcd@email.com",
          password: "$2b$10$OU6KkdBAHCwCLt96Z1BsOOCMakZ.xhuEgpov7Cpe4lfu5NpWoqOWu",
          accNames: ["kids"],
          avatars: [],
          __v: 0
        }
      }
    }).as('getProfilesAPI');

    cy.visit('localhost:3000')




    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
      statusCode: 200,
      body: {
        "dates": {
          "maximum": "2025-02-19",
          "minimum": "2025-01-08"
        },
        "page": 1,
        "results": [
          {
            "adult": false,
            "backdrop_path": "/qfAfE5auxsuxhxPpnETRAyTP5ff.jpg",
            "genre_ids": [
              28,
              53,
              878
            ],
            "id": 822119,
            "original_language": "en",
            "original_title": "Captain America: Brave New World",
            "overview": "After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.",
            "popularity": 2666.301,
            "poster_path": "/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
            "release_date": "2025-02-12",
            "title": "Captain America: Brave New World",
            "video": false,
            "vote_average": 6.2,
            "vote_count": 468
          },
          {
            "adult": false,
            "backdrop_path": "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
            "genre_ids": [
              28,
              878,
              35,
              10751
            ],
            "id": 939243,
            "original_language": "en",
            "original_title": "Sonic the Hedgehog 3",
            "overview": "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
            "popularity": 2651.118,
            "poster_path": "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
            "release_date": "2024-12-19",
            "title": "Sonic the Hedgehog 3",
            "video": false,
            "vote_average": 7.767,
            "vote_count": 1835
          },
          {
            "adult": false,
            "backdrop_path": "/u7AZ5CdT2af8buRjmYCPXNyJssd.jpg",
            "genre_ids": [
              28,
              35
            ],
            "id": 1160956,
            "original_language": "zh",
            "original_title": "熊猫计划",
            "overview": "International action star Jackie Chan is invited to the adoption ceremony of a rare baby panda, but after an international crime syndicate attempts to kidnap the bear, Jackie has to save the bear using his stunt work skills.",
            "popularity": 1949.941,
            "poster_path": "/xVS9XiO9upp2SnWx6KpBYb79hLR.jpg",
            "release_date": "2024-10-01",
            "title": "Panda Plan",
            "video": false,
            "vote_average": 7.102,
            "vote_count": 103
          },
          {
            "adult": false,
            "backdrop_path": "/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
            "genre_ids": [
              28,
              12,
              53
            ],
            "id": 539972,
            "original_language": "en",
            "original_title": "Kraven the Hunter",
            "overview": "Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
            "popularity": 1398.29,
            "poster_path": "/nrlfJoxP1EkBVE9pU62L287Jl4D.jpg",
            "release_date": "2024-12-11",
            "title": "Kraven the Hunter",
            "video": false,
            "vote_average": 6.674,
            "vote_count": 1231
          },
          {
            "adult": false,
            "backdrop_path": "/qSOMdbZ6AOdHR999HWwVAh6ALFI.jpg",
            "genre_ids": [
              28,
              80,
              53
            ],
            "id": 1249289,
            "original_language": "en",
            "original_title": "Alarum",
            "overview": "Two married spies caught in the crosshairs of an international intelligence network will stop at nothing to obtain a critical asset. Joe and Lara are agents living off the grid whose quiet retreat at a winter resort is blown to shreds when members of the old guard suspect the two may have joined an elite team of rogue spies, known as Alarum.",
            "popularity": 1084.884,
            "poster_path": "/v313aUGmMNj6yNveaiQXysBmjVS.jpg",
            "release_date": "2025-01-16",
            "title": "Alarum",
            "video": false,
            "vote_average": 5.8,
            "vote_count": 196
          },
          {
            "adult": false,
            "backdrop_path": "/ybSA7fUbYHw8VeRiSJ7tgKJnYWZ.jpg",
            "genre_ids": [
              28,
              53
            ],
            "id": 1410082,
            "original_language": "en",
            "original_title": "Sniper: The Last Stand",
            "overview": "To stop an arms dealer from unleashing a deadly superweapon, Ace sniper Brandon Beckett and Agent Zero are deployed to Costa Verde to lead a group of elite soldiers against an unrelenting militia. Taking an untested sniper under his wing, Beckett faces his newest challenge: giving orders instead of receiving them. With both time and ammo running low in a race to save humanity, the team must overcome all odds just to survive.",
            "popularity": 933.081,
            "poster_path": "/TVvIyCsFCmLk9MRLbAZi4X8f32.jpg",
            "release_date": "2025-01-21",
            "title": "Sniper: The Last Stand",
            "video": false,
            "vote_average": 6.6,
            "vote_count": 98
          },
          {
            "adult": false,
            "backdrop_path": "/xZm5YUNY3PlYD1Q4k7X8zd2V4AK.jpg",
            "genre_ids": [
              28,
              35
            ],
            "id": 993710,
            "original_language": "en",
            "original_title": "Back in Action",
            "overview": "Fifteen years after vanishing from the CIA to start a family, elite spies Matt and Emily jump back into the world of espionage when their cover is blown.",
            "popularity": 878.347,
            "poster_path": "/3L3l6LsiLGHkTG4RFB2aBA6BttB.jpg",
            "release_date": "2025-01-15",
            "title": "Back in Action",
            "video": false,
            "vote_average": 6.485,
            "vote_count": 981
          },
          {
            "adult": false,
            "backdrop_path": "/vfkzNcVzTRCq3C2jYIZtIjSdwf7.jpg",
            "genre_ids": [
              27,
              53,
              28
            ],
            "id": 1247019,
            "original_language": "th",
            "original_title": "ธี่หยด 2",
            "overview": "Three years after his sister's death, Yak relentlessly searches for the dark spirit that killed her in hopes of seeking revenge.",
            "popularity": 1106.709,
            "poster_path": "/uDW5eeFUYp1vaU2ymEdVBG6g7iq.jpg",
            "release_date": "2024-10-10",
            "title": "Death Whisperer 2",
            "video": false,
            "vote_average": 7.34,
            "vote_count": 47
          },
          {
            "adult": false,
            "backdrop_path": "/eHu1ZxFPmqyhnait9VdsOQBEFOk.jpg",
            "genre_ids": [
              27,
              53
            ],
            "id": 710295,
            "original_language": "en",
            "original_title": "Wolf Man",
            "overview": "With his marriage fraying, Blake persuades his wife Charlotte to take a break from the city and visit his remote childhood home in rural Oregon. As they arrive at the farmhouse in the dead of night, they're attacked by an unseen animal and barricade themselves inside the home as the creature prowls the perimeter. But as the night stretches on, Blake begins to behave strangely, transforming into something unrecognizable.",
            "popularity": 857.942,
            "poster_path": "/jTPBMPTgk9zOUGSkWcoOGbX8cTi.jpg",
            "release_date": "2025-01-15",
            "title": "Wolf Man",
            "video": false,
            "vote_average": 6.5,
            "vote_count": 372
          },
          {
            "adult": false,
            "backdrop_path": "/3SOunz2Z0qcOVlrkYFj20HquziB.jpg",
            "genre_ids": [
              878,
              12,
              28,
              18,
              10770
            ],
            "id": 1114894,
            "original_language": "en",
            "original_title": "Star Trek: Section 31",
            "overview": "Emperor Philippa Georgiou joins a secret division of Starfleet tasked with protecting the United Federation of Planets and faces the sins of her past.",
            "popularity": 612.596,
            "poster_path": "/sqiCinCzUGlzQiFytS30N1nO3Pt.jpg",
            "release_date": "2025-01-15",
            "title": "Star Trek: Section 31",
            "video": false,
            "vote_average": 4.732,
            "vote_count": 164
          },
          {
            "adult": false,
            "backdrop_path": "/cA88pwGnHa64BBcU3R1oCcJH9Qc.jpg",
            "genre_ids": [
              28,
              27,
              53
            ],
            "id": 970450,
            "original_language": "en",
            "original_title": "Werewolves",
            "overview": "A year after a supermoon’s light activated a dormant gene, transforming humans into bloodthirsty werewolves and causing nearly a billion deaths, the nightmare resurfaces as the supermoon rises again. Two scientists attempt to stop the mutation but fail and must now struggle to reach one of their family homes.",
            "popularity": 568.478,
            "poster_path": "/cRTctVlwvMdXVsaYbX5qfkittDP.jpg",
            "release_date": "2024-12-04",
            "title": "Werewolves",
            "video": false,
            "vote_average": 6.188,
            "vote_count": 301
          },
          {
            "adult": false,
            "backdrop_path": "/au3o84ub27qTZiMiEc9UYzN74V3.jpg",
            "genre_ids": [
              28,
              878,
              53
            ],
            "id": 1035048,
            "original_language": "en",
            "original_title": "Elevation",
            "overview": "A single father and two women venture from the safety of their homes to face monstrous creatures to save the life of a young boy.",
            "popularity": 618.091,
            "poster_path": "/tnfc0NJ3BzhJrGJhkkEd6MHBdq5.jpg",
            "release_date": "2024-11-07",
            "title": "Elevation",
            "video": false,
            "vote_average": 6.4,
            "vote_count": 535
          },
          {
            "adult": false,
            "backdrop_path": "/2uD97QmWivS5hgnraXwroMHfSEU.jpg",
            "genre_ids": [
              27
            ],
            "id": 1352774,
            "original_language": "en",
            "original_title": "Piglet",
            "overview": "On Kate's 21st birthday camping trip, her friends encounter Piglet, a monstrous human-pig hybrid who brutally murders one of them. They uncover Piglet's origins and Kate must confront her past to survive the relentless killer.",
            "popularity": 569.023,
            "poster_path": "/5wZNFUJAwyX6RCxdqrLO9lLWJ20.jpg",
            "release_date": "2025-01-25",
            "title": "Piglet",
            "video": false,
            "vote_average": 5.8,
            "vote_count": 8
          },
          {
            "adult": false,
            "backdrop_path": "/uJK0jjJ8QDOQw5lcNBwu059ht4D.jpg",
            "genre_ids": [
              10749,
              18
            ],
            "id": 1294203,
            "original_language": "en",
            "original_title": "My Fault: London",
            "overview": "18-year-old Noah moves from America to London, with her mother who's recently fallen in love with William, a wealthy British businessman. Noah meets William’s son, bad-boy Nick, and soon discovers there is an attraction between them neither can avoid. As Noah spends the summer adjusting to her new life, her devastating past will catch up with her while falling in love for the first time.",
            "popularity": 978.587,
            "poster_path": "/ttN5D6GKOwKWHmCzDGctAvaNMAi.jpg",
            "release_date": "2025-02-12",
            "title": "My Fault: London",
            "video": false,
            "vote_average": 7.6,
            "vote_count": 129
          },
          {
            "adult": false,
            "backdrop_path": "/9oYdz5gDoIl8h67e3ccv3OHtmm2.jpg",
            "genre_ids": [
              27,
              878
            ],
            "id": 933260,
            "original_language": "en",
            "original_title": "The Substance",
            "overview": "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
            "popularity": 598.648,
            "poster_path": "/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
            "release_date": "2024-09-07",
            "title": "The Substance",
            "video": false,
            "vote_average": 7.1,
            "vote_count": 3842
          },
          {
            "adult": false,
            "backdrop_path": "/pqulyfkug9A7TmmRn5zrbRA8TAY.jpg",
            "genre_ids": [
              28,
              35
            ],
            "id": 1255788,
            "original_language": "fr",
            "original_title": "Le Jardinier",
            "overview": "Every year the Prime Minister has a list of all kinds of troublemakers eliminated in the name of the famous Reason of State. Serge Shuster, Special Adviser to the President of the Republic, finds himself on this list, better known as the Matignon List.  Condemned to certain death and at the heart of an implacable plot and a state secret that also put his family in danger, Serge, his wife and children have only one hope left - their gardener, Léo, who hates it when « slugs » invade his garden... Especially those that want to kill innocent families.",
            "popularity": 564.333,
            "poster_path": "/5T9WR7vIOnHm6xhVt5zBuPbBgt1.jpg",
            "release_date": "2025-01-30",
            "title": "The Gardener",
            "video": false,
            "vote_average": 6.5,
            "vote_count": 71
          },
          {
            "adult": false,
            "backdrop_path": "/h7r6LZ32dgLwtwSW3CxoWIYD9pr.jpg",
            "genre_ids": [
              27,
              14
            ],
            "id": 426063,
            "original_language": "en",
            "original_title": "Nosferatu",
            "overview": "A gothic tale of obsession between a haunted young woman and the terrifying vampire infatuated with her, causing untold horror in its wake.",
            "popularity": 643.565,
            "poster_path": "/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg",
            "release_date": "2024-12-25",
            "title": "Nosferatu",
            "video": false,
            "vote_average": 6.675,
            "vote_count": 2104
          },
          {
            "adult": false,
            "backdrop_path": "/zwSDvbnN51JqU1ULzPnEc22DkqV.jpg",
            "genre_ids": [
              35,
              18,
              10749
            ],
            "id": 1272149,
            "original_language": "en",
            "original_title": "Bridget Jones: Mad About the Boy",
            "overview": "Bridget Jones finally has some luck in her life; she has a great job as a screenwriter, her family and a new boyfriend; the fact that he's over twenty years her junior isn't the only thing causing problems.",
            "popularity": 614.838,
            "poster_path": "/taEVBdVSqYo9YeN3ycw2SosklZL.jpg",
            "release_date": "2025-02-12",
            "title": "Bridget Jones: Mad About the Boy",
            "video": false,
            "vote_average": 6.8,
            "vote_count": 74
          },
          {
            "adult": false,
            "backdrop_path": "/ie8OSgIHEl6yQiGJ90dsyBWOpQA.jpg",
            "genre_ids": [
              16,
              14,
              12,
              10751,
              28
            ],
            "id": 839033,
            "original_language": "en",
            "original_title": "The Lord of the Rings: The War of the Rohirrim",
            "overview": "A sudden attack by Wulf, a clever and traitorous lord of Rohan seeking vengeance for the death of his father, forces Helm Hammerhand, the King of Rohan, and his people to make a daring last stand in the ancient stronghold of the Hornburg.",
            "popularity": 499.573,
            "poster_path": "/cXzCOx1hUuU9CfmiEv6rXjb6EqU.jpg",
            "release_date": "2024-12-05",
            "title": "The Lord of the Rings: The War of the Rohirrim",
            "video": false,
            "vote_average": 6.7,
            "vote_count": 429
          },
          {
            "adult": false,
            "backdrop_path": "/1pmXyN3sKeYoUhu5VBZiDU4BX21.jpg",
            "genre_ids": [
              16,
              878,
              10751
            ],
            "id": 1184918,
            "original_language": "en",
            "original_title": "The Wild Robot",
            "overview": "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
            "popularity": 427.385,
            "poster_path": "/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
            "release_date": "2024-09-12",
            "title": "The Wild Robot",
            "video": false,
            "vote_average": 8.3,
            "vote_count": 4328
          }
        ],
        "total_pages": 207,
        "total_results": 4123
      }
    }).as('moviesAPI')


    cy.wait('@moviesAPI')


    cy.wait('@getProfilesAPI');

    cy.wait(1000)

    cy.get('#select-user-heading')
      .should('have.text', "Who's watching?")

    cy.get('#kids-acc')
      .should('exist')

    cy.get('#add-profile-btn')
      .should('exist')
      .click()

    cy.wait(1500)
    cy.get('#cancel-add-profile-btn')
      .click()


    cy.intercept('PUT', '/api/like-movie', {
      statusCode: 200,
      body: { message: 'not updated' }
    }).as('likeMovieAPI');

    cy.intercept('PUT', '/api/dislike-movie', {
      statusCode: 200,
      body: { message: 'not updated' }
    }).as('dislikeMovieAPI');

    cy.intercept('PUT', '/api/watchlist-movie', {
      statusCode: 200,
      body: { message: 'not updated' }
    }).as('watchlistMovieAPI');




    cy.get('#kids-acc')
      .click()


    cy.wait('@likeMovieAPI')
    cy.wait('@dislikeMovieAPI')
    cy.wait('@watchlistMovieAPI')


    cy.wait(1000)
    cy.get('#more-info-btn')
      .should('exist')
      .click()

    cy.get('#modal-movie-name')
      .should('have.text', 'Captain America: Brave New World')

    cy.get('#modal-play-btn')
      .should('exist')

    cy.get('#modal-watchlist-btn')
      .should('exist')

    cy.get('#modal-like-btn')
      .should('exist')

    cy.wait(1000)
    cy.get('#modal-close-btn')
      .click()


    cy.scrollTo('bottom')
    cy.get('#poster-2')
      .click()

    cy.get('#modal-like-btn')
      .click()

    cy.contains('Saved to Liked Movies')

    cy.wait(750)
    cy.get('#modal-close-btn')
      .click()


    cy.get('#open-menu-btn')
      .trigger('mouseover')

    cy.wait(1000)

    cy.get('#liked-movies-page-btn')
      .click()


    cy.wait(1500)
    cy.go('back')

    cy.wait(1000)


    cy.scrollTo('bottom')
    // cy.wait('@getLikedMovieAPI')

    cy.get('#poster-2')
      .trigger('mouseover')

    cy.wait(1000)
    cy.get('#poster-0')
      .trigger('mouseover')
    cy.get('#poster-0')
      .trigger('mouseout')

    cy.get('#play-movie-btn')
      .click()

    cy.wait(1000)

    cy.get('#play-pause-btn')
      .click()

    cy.wait(750)
    cy.get('.video-player')
      .trigger('mousemove')
    cy.get('#play-pause-btn')
      .click()

    cy.get('#forward-btn')
      .click()
      .wait(500)
      .click()
      .wait(500)
      .click()


    cy.get('.video-player')
      .trigger('mousemove')
    cy.get('#video-player-volume-inp')
      .invoke('val', 0.5)
      .invoke('val', 0.6)
      .invoke('val', 0.7)
      .invoke('val', 0.8)
      .invoke('val', 0.5)
      .invoke('val', 0.6)
      .invoke('val', 0.7)
      .invoke('val', 0.8)
      .trigger('input')
      .trigger('change')


    cy.get('.video-player')
      .trigger('mousemove')
    cy.get('#video-player-lock-btn')
      .click()

    cy.wait(2000)
    cy.get('.video-player')
      .trigger('mousemove')
    cy.get('#video-player-lock-btn')
      .click()


    cy.get('.video-player')
      .trigger('mousemove')
    cy.get('#video-player-speed-btn')
      .click()

    cy.get('.video-player')
      .trigger('mousemove')
    cy.get('#video-player-speed-inp')
      .invoke('val', 1.25)
      .trigger('input')
      .trigger('change')

    cy.get('.video-player')
      .trigger('mousemove')
    cy.get('#video-player-speed-close-btn')
      .click()


    cy.get('.video-player')
      .trigger('mousemove')
    cy.get('#video-player-dislike-btn')
      .click()


    cy.get('.video-player')
      .trigger('mousemove')
    cy.wait(750)
    cy.get('.video-player')
      .trigger('mousemove')

    cy.get('#video-player-close-btn')
      .click()
  })
})