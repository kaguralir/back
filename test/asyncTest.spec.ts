

const axios = require('axios')
const fetchData = async (id) => {
    console.log('called');
    const results = await axios.get(
        `https://my-json-server.typicode.com/kaguralir/demo/user/${id}`
    );
    console.log('does something', results);
    return results;
};

function forEach(items, callback) {
    for (
        let index = 0;
        index < items.length;
        index++
    ) {
        callback(items[index]);
    }
}

it('mock callback', () => {
    const mockCallback = jest.fn((x) => 42 + x);

    forEach([0, 1], mockCallback);

    expect(mockCallback.mock.calls.length).toBe(2);

    expect(mockCallback.mock.calls[0][0]).toBe(0);

    expect(mockCallback.mock.calls[1][0]).toBe(1);

    expect(mockCallback.mock.results[0].value).toBe(
        42
    );
});

it('return mock', () => {
    const mock = jest.fn();

    mock
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

    const results = mock();
    const results2 = mock();

    expect(results).toBe(true);
    expect(results2).toBe(false);
});

it('mock modules or custom functions', async () => {
    jest.spyOn(axios, 'get').mockReturnValueOnce('User1');

    const results = await fetchData(1);
    console.log("results are", results);

    expect(results).toBe('User1');
});


