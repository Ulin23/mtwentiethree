let WheeIn = [ "vomiting leaf", "wandering trill" , "gooddull filler", "really thick curve", "winnowy gullet", "randomhearth", "full belly", "orange", "loud keyboard", "calculating turn","burgeoning chest", "zinger"]
let allcolors = ["blue", "green", "yellow", "red", "black", "white", "pink", "purple", "nacy", "orange", "turquoise"]
            window.onclick = function() {
                document.getElementById("jargon").innerHTML = WheeIn[Math.floor(Math.random() * WheeIn.length)];
                document.getElementById("lxd").onmouseover = function () {
                    document.getElementById("jargon").style.color = "blue";
                    document.getElementById("lxd").style.backgroundImage = "conic-gradient(green, red, yellow, red, yellow, green)";
                    document.getElementById("goldfish").style.opacity = ".5";
                    document.getElementById("cranes").style.display = "none";
                };
            document.getElementById("lxd").onmouseout = function () {
                document.getElementById("jargon").style.backgroundImage = "none";
                document.getElementById("goldfish").style.opacity = "1";
                document.getElementById("cranes").style.display = "block";
            };
            };
            document.getElementById("lxd").onmouseenter = function() {
                this.style.backgroundColor =
                allcolors[Math.floor(Math.random() * WheeIn.length)];
            };