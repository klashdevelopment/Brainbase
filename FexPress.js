const req = {
  query: {
    test: "testing worked"
  }
}
const res = {
  redirect(url) {
    console.log("FexPress: (.redirect) redirected to '" + url + "'");
  },
  end(str) {
    console.log("FexPress: (.end) ended '" + str + "'");
  },
  write(str) {
    console.log("FexPress: (.write) wrote '" + str + "'");
  },
  send(str) {
    console.log("FexPress: (.send) recived '" + str + "'");
  },
  json(str) {
    console.log("FexPress: (.json) recived JSON '" + JSON.stringify(str) + "'");
  },
}
let gets = [];
const clone = function() {
  console.log("FexPress: clone made");
  return {
    use(instance) {
      console.log("FexPress: app has USED " + JSON.stringify(instance));
    },
    get(endpoint, callback) {
      console.log("FexPress: GET request saved.");
      gets.push({ endpoint, callback });
    },
    FEXHandle(endpoint) {
      for (var get of gets) {
        if (get.endpoint == endpoint) {
          get.callback(req, res);
        }
      }
    },
    listen(port) {
      console.log("FexPress: Is not listening on " + port);
      console.log("FexPress: Testing all handlers now!");
      for (var ep of gets) {
        console.log("Handling " + ep.endpoint + " below:")
        this.FEXHandle(ep.endpoint);
      }
    }
  }
}
clone.static = (dir) => {
  console.log("FexPress: STATIC created for '" + dir + "'");
  return { dirname: dir };
}
clone.fakes = {
  res: () => { },
  req: () => { }
};
clone.fakes.res = res;
clone.fakes.req = req;
module.exports = clone;