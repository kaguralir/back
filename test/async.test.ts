import axios from 'axios';
const fetchData = async (user_id) => {
    const results = await axios.get(
        `https://my-json-server.typicode.com/kaguralir/demo/user/${user_id}`
    );
    console.log("fetchtdata", results);

    return results.data;
};

it('should return correct user', async () => {
    const user = await fetchData(1);
    console.log('use', user);

    expect(user.user_id).toBe(1);
});