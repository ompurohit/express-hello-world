module.exports = {
    index: (request, response) => {
        return response.render('404', {
            title: '404 not found...'
        });
    }
}