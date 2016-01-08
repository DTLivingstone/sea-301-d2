// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.initNewArticlePage = function() {
    // Show the HTML form
    $('.tab-content').show();
    // Hide export field (but show it later when article content exists)
    $('#export-field').hide();
    // Add event handlers
    //   . Highlight selected input area
    $('article-json').on('focus', function(){
      this.select();
    });
    //   . Update article (live preview)
    $('#new-form').on('change', 'input, textarea', articleView.create);
};

articleView.create = function() {
    // Remove existing article draft
    var article;
    $('#articles').empty();

    // Instantiate an article using data the user entered in the form fields
    $('#article-title').empty();
    // Call article's method that uses Handblebars to add this new article to the DOM

    article = new Article({
      title: $('#article-title').val(),
      author: $('#article-author').val(),
      authorURL: $('#article-author-url').val(),
      category: $('#article-category').val(),
      body: $('#article-body').val(),
      publishedOn: $('#article-published:checked').length ? util.today() : null
    });
    // Apply color/font syntax highlighting to all code blocks in the article
    $('#articles').append(article.toHtml());
    // Show the export field and Export the new article as a JSON
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    // string so it's ready to copy/paste into blogArticles.js
    $('#export-field').show();
    $('#articles-josn').val(JSON.stringify(article) + ',');
};
