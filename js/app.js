var data = {
    cat_id: 0,
    cat1: {
        id: 1,
        image: "img/cat0.jpg",
        title: "First",
        click: 0,
    },
    cat2: {
        id: 2,
        image: "img/cat1.jpg",
        title: "Second",
        click: 0
    },
    cat3: {
        id: 3,
        image: "img/cat2.jpg",
        title: "Third",
        click: 0
    },
    cat4: {
        id: 4,
        image: "img/cat3.jpg",
        title: "Fourth",
        click: 0
    },
    cat5: {
        id: 5,
        image: "img/cat4.jpg",
        title: "Fifth",
        click: 0
    }
};

var octopus = {
    getCat: function () {
        catView.init();
        adminView.init();
    },

    setCurrent: function (currentCat_id) {
        data.cat_id = currentCat_id;

    },

    getCurrent: function () {
        return data[Object.keys(data)[data.cat_id]];
    },

    addClick: function () {
        var currentCat = this.getCurrent();
        ++currentCat.click;
        catView.render();

    },

    init: function () {
        listView.init();
    }
};

var listView = {
    init: function () {
        Object.keys(data).forEach((item) => {
            if (data[item]) {
                var clickCat = $('#' + data[item].id);
                clickCat.click(async function () {
                    octopus.setCurrent(data[item].id);
                    octopus.getCat();
                })
            }

        });
    }
};

var catView = {
    init: function () {
        var currentCat = octopus.getCurrent();
        this.name = document.getElementById("title");
        this.count = document.getElementById("count");
        this.heart = document.getElementById("heart");
        this.img = document.getElementById("cat_img");
        this.img.innerHTML = '';
        var temp = document.createElement('IMG');
        temp.setAttribute('id', 'img_id');
        this.image = temp;
        this.img.appendChild(temp);
        $('#img_id').click(function () {
            octopus.addClick();
        });
        this.heart.innerHTML = '&#10084';
        $('#admin').click(function () {
            adminView.show();
        });
        $('#cancel').click(function () {
            adminView.hide();
        });
        $('#save').click(function () {
            adminView.update();
            adminView.reset();
        });
        this.render();
    },
    render: function () {
        var currentCat = octopus.getCurrent();
        this.image.src = currentCat.image;
        this.name.innerHTML = currentCat.title + " Cat";
        this.count.innerHTML = currentCat.click;
    }
};

var adminView = {
    init: function () {
        document.getElementById("admin_area").style.display = "none";
        document.getElementById("admin").style.display = "block";
    },
    show: function () {
        document.getElementById("admin_area").style.display = "block";
    },
    hide: function () {
        document.getElementById("admin_area").style.display = "none";
    },
    update: function () {
        // https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80
        // https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80
        var currentCat = octopus.getCurrent();
        currentCat.title = document.getElementById('cName').value;
        currentCat.image = document.getElementById("url").value;
        currentCat.click = document.getElementById("clicks").value;
        this.hide();
        catView.render();        
    },
    reset: function () {
        document.getElementById('cName').value = '';
        document.getElementById("url").value = '';
        document.getElementById("clicks").value = '';
    }
};

octopus.init();