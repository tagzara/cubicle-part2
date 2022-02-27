module.exports = {
    
   
    async attach(req, res) {
        const cube = await req.storage.getById(req.params.id);
        const accessories = await req.storage.getAllAccessories((cube.accessories || []).map(a => a._id));

        res.render('attach', {
            title: 'Attach Stickers',
            cube,
            accessories
        });
    },
    async attachPost(req, res) {
        const cubeId = req.params.cubeId;
        const stickerId = req.body.accessory;

        await req.storage.attachStickers(cubeId, stickerId);

        res.redirect(`/details/${cubeId}`);
    }
};