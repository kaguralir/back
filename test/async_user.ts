import axios from 'axios';

const fetchData = async (user_id) => {
    const results = await axios.get(
        `https://my-json-server.typicode.com/kaguralir/demo/user/${user_id}`
    );
    return results.data;
};

module.exports = fetchData;