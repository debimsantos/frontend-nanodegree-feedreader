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

        /* This test loops through each feed
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


    describe('The Menu', function() {
        var menu = $('.menu-icon-link');

        /* Test to ensure that the menu element is
        * hidden by default.
        */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that the menu changes visibility
        * when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('appears when clicked', function() { // toggle ON
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        it('disappears when clicked again', function() { // toggle OFF
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function() {

        /* Test to ensure that when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */

        beforeEach(function (done) {
            loadFeed(0, function() {
              done();
            });
        });

        it('has at least one entry', function(done) {
            var feedEntry = [];

            $('.feed .entry').each(function(i, o) {
              feedEntry.push(o);
            });

            //console.log(feedEntry); uncomment to see entries

            expect(feedEntry.length).toBeGreaterThan(0);
            done();
        });
    });


    describe('New Feed Selection', function() {
        var firstFeed;
        var secondFeed;

        /* Test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        beforeEach(function(done) {
            loadFeed(0, function() { // 1st loading
            firstFeed = $('.feed').html(); // store the result
                loadFeed(1, function() { // 2nd loading
                secondFeed = $('.feed').html(); // store result
                done();
                });
            });
        });

        it('changes feed content when loaded', function() {
            expect(firstFeed).not.toEqual(secondFeed); // compare
        });
    });

}());
