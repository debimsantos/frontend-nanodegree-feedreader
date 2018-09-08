/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('all URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all names defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            })
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        var menu = $('.menu-icon-link');
        //var body = $('.body');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            //expect((body).hasClass('menu-hidden')).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('appears when clicked', function() {

             menu.click();
             expect($('body').hasClass('menu-hidden')).toBe(false);

          });

          it('disappears when clicked again', function() {
              menu.click();
              expect($('body').hasClass('menu-hidden')).toBe(true);

          });
      });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var feed = $('.feed');

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function() {
            loadFeed(0, function() {
              done();
            });
         });

         it('has at least one entry', function() {
            expect(feed.children.length).toBeGreaterThan(0);

         });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var firstFeed;
        var secondFeed;

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       beforeEach(function(done) {
          loadFeed(0, function() {
            firstFeed = $('.feed').html();
            loadFeed(1, function() {
                secondFeed = $('.feed').html();
                done();
            });
          });
       });


       it('changes feed content when loaded', function() {
          expect(firstFeed).not.toBe(secondFeed);
       });

    });

    });
}());
