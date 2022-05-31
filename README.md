# Setting up project

1. Make `credentials.js` file in `src`
2. contents of this file must be
```
const headers = {
  Authorization: "Bearer <your_token_here>",
  Accept: "application/json"
};

export default headers;
```
3. Replace `<your_token_here>` with your token
4. save 
