function log (stuff) {
    return console.log(stuff);
}

var binaryTree = (function binaryTree () {

    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    
    function Props(value, left, right) {
        this.value = value
        this.left = left;
        this.right = right;
    }
    var obj = {}

     obj.adm = new Props(
         {name : "Adam", age: 19},  
     );

     obj.jhn = new Props(
         {name: "John", age: 22},
     );

    obj.jne =  new Props(
        {name : "Jane", age: 20},
        obj.adm,
        obj.jhn
    );


    var rootNode = obj.jne;

    function findNode (root, ageFind) {
        if (root.value.age == ageFind) return root.value.name;
        if (root.left != undefined && ageFind < root.value.age) return findNode(root.left, ageFind)
        else if (root.right != undefined && ageFind > root.value.age) return findNode(root.right, ageFind)
        else return false
    }
    
    function putNode(node, abbr, namePut, age) {

        return (function put(current) {
            if (age < current.value.age) {
               return current.left == undefined ? createProp(current, "left") : put(current.left)
            } else if (age > current.value.age) {
                return current.right == undefined ? createProp(current, "right") : put(current.right)   
            }
        }(node));

        function createProp(node, child) {
            obj[abbr] = new Props(
                new Person(namePut, age)
            )
            node[child] = obj[abbr];
            return obj[abbr];
        }
    }
    

    return {
        getObj : function () {
             log(obj)
        },
        getUser: function (abbr) {
             return obj[abbr];
        },
        getAge : function (age) {
            return findNode(rootNode, age);
        },
        put : function (abbr, name, age) {
            if (this.getAge(age)) return false;        
            return putNode(rootNode, abbr, name, age);   
        }
    }

}());

binaryTree.put("sam", "Samuel", 50) 

binaryTree.put("snn", "Senner", 24) 

binaryTree.put("ant", "Anton", 18) 
binaryTree.put("smn", "Simone", 40) 

log(
    binaryTree.getAge(50) // Samuel 
)
log(
    binaryTree.getUser("ant") // "Anton", left undefined, right undefined
)

// binaryTree.getObj();

log(
    binaryTree.getAge(40) // Simone
)