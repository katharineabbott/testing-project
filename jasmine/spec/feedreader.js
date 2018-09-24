/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined and URL is not empty', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
                expect(item.url).not.toEqual('');
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined and name is not empty', function () {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(item.name).not.toEqual('');
            });
        });
    });

    /* Write a new test suite named "The menu" */
    
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // Select the "body" element and create a variable to hold the class list of the "body" element
        var menuSelector = $("body");
        var menu = menuSelector[0].classList;

        it('is hidden by default', function() {
            expect(menu).toContain('menu-hidden');
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        // Selects the "icon" element and checks if the class list for "body" contains the "menu-hidden" class
        // when the menu is clicked, and then checks again when the menu is clicked again
        it('changes visibility on click', function() {
            var hamburgerSelector = $("i");
            hamburgerSelector.click();
            expect(menu).not.toContain('menu-hidden');
            hamburgerSelector.click();
            expect(menu).toContain('menu-hidden');
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
    
        // Selects the "feed" class and expects it to have at least one child (for out of bound array handling),
        // then selects the first child of the "feed" class, and expects that it has at least one child. Selects
        // the class list of the "entry" variable, expects that it has at least one class, and then finally, checks that the
        // class list contains the class "entry".
        it('has .entry inside .feed container when loadFeed finishes', function(done){
            var feed = $('.menu-hidden > .feed');
            expect(feed.children).not.toBeLessThan(1);
            var entry = feed[0].children[0];
            expect(entry.children).not.toBeLessThan(1);
            var entryClassList = entry.children[0].classList;
            expect(entryClassList).not.toBeLessThan(1);
            expect(entryClassList).toContain('entry');
            done();
        });
    }); 

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        
        // Calls loadFeed on the first feed, and stores the current value of
        // the "header-title" class before calling done().
        var feedTitleSelector = $('.header-title');
        beforeEach(function(done) {
            loadFeed(0, () => {
                var defaultFeedTitle = feedTitleSelector[0].textContent;
                this.firstFeedTitle = defaultFeedTitle;
                done();
            });
        });

        // Calls loadFeed on the second feed, and stores the current value of the
        // "header-title" class. Expects that the value of "header-title" for the
        // initial feed and the current feed are different, to test that the
        // feed changed when loadFeed was called.
        it('content actually changes when new feed is loaded', function(done){
            loadFeed(1, () =>  {
                var firstFeedTitle = this.firstFeedTitle;
                var secondFeedTitleSelector = $('.header-title');
                var secondFeedTitle = secondFeedTitleSelector[0].textContent;
                expect(firstFeedTitle).not.toBe(secondFeedTitle);
                done();
            });
        });
    });
}());