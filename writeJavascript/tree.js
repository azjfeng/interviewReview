let arr = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 },
];

function tree(data, result, pid) {
    for (var item of data) {
        if (item.pid === pid) {
            const newItem = { ...item, children: [] };
            result.push(newItem);
            tree(data, newItem.children, item.id);
        }
    }
}
const arrayToTree = (data, pid) => {
    const result = [];
    tree(data, result, pid);
    return result;
};
console.log(arrayToTree(arr, 0));
