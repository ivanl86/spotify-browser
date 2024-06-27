import app from './app';

const DEFAULT_PORT: string = '3000';
const PORT: string = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
