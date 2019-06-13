var add = new Vue({
    el: '#add',
    data: {
        newComment: "",
        items: [],
        comment: "",
        addItem: null,
    },
    created() {
        this.getItems();
    },
    methods: {
        async addNewItem(){
            try {
                let result = await axios.post('/api/items', {
                comment: this.comment,
                });
                this.addItem = result.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getItems() {
            try {
              let response = await axios.get("/api/items");
              this.items = response.data;
              return true;
            } catch (error) {
              console.log(error);
            }
        },
        async deleteItem(item) {
            try {
              let response = await axios.delete("/api/items/" + item.id);
              this.getItems();
              return true;
            } catch (error) {
              console.log(error);
            }
        },
        async editItem(item) {
            try {
              let response = await axios.put("/api/items/" + item.id, {
                comment: this.newComment,
              });
              this.getItems();
              return true;
            } catch (error) {
              console.log(error);
            }
        },
    },
});

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}