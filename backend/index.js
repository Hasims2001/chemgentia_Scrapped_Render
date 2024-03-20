const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Connect to MongoDB
mongoose.connect('mongodb+srv://hardik:hardik@cluster0.bso1uoa.mongodb.net/chemgentia?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



const app = express();
app.use(cors())
app.get('/:collection', async (req, res) => {
    const collection = req.params.collection;
    try {
        const data = await mongoose.connection.collection(collection).find().toArray();

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));