module.exports = {
    errorPage: (req, res) => {
        res.render('404', {title: 'Error'});
    }
};