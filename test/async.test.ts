const gettingData = require('./async');

it('should return correct user', () => {
    fetchData(1).then((user) => {
        expect(user.id).toBe(1);
    });
});

it('should return correct user', async () => {
    const user = await fetchData(1);
    expect(user.user_id).toBe(1);
});