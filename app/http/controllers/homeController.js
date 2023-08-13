module.exports = {
    index: (request, response) => {
        return response.render('home',{
            title:'Home Page'
        });
    }
}