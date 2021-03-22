import 'dotenv/config';
import app from './app';

app.listen(process.env.PORT, async () => {
    await initContract();
    console.log(`Server up on port ${process.env.PORT}!`);
});