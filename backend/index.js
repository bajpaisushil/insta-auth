const PORT=process.env.PORT || 5001
require("dotenv").config()

const app=require("./app");

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

