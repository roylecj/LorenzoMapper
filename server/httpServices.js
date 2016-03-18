process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

Meteor.methods({
    callViaduct: function (url) {
      this.unblock();

      console.log("url=" + url);

      try {
        var result = HTTP.call("GET", url);
        // console.log(result.content);

        return result.content;
      } catch (e) {
        // This is an error, so we cannot connect

        console.log("ERROR-" + e);
        throw new Meteor.Error("error-connecting-to-runtime", "Unable to connect to LORENZO");
      };
    }
});
