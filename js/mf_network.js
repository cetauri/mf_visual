
  function draw_word_network(element_id, url, type, options) {

    $.ajax({
      type: type, 
      dataType: "xml", 
      url: url,
      // data: "arg=L",
      success: function(xml) {
        var list = $(xml).find("List");
        var count = list.attr("count");
        var score = list.attr("score");
        var sDate  = list.attr("sDate");
        var eDate = list.attr("eDate");
        // console.log(sDate, eDate, count, score);

        data_nodes = [{id: 0, label: '', group : 0, title : score}];
        data_edges = [];

        if ($(xml).find("List").find("Member").length > 0) {

          $(xml).find("Member").each(function(idx) {

              var id = idx + 1;
              var c_score = $(this).attr("score");
              var children = $(this).clone();
              children.find("Child").each(function(i) {
                  var c_text = $(this).text();
              
                  // Child 노드 추가
                  // console.log(idx, i, $(this).text());
                  var sub_idx = id + '.' + i;
                  data_nodes.push({id: id + '.' + i, label: c_text, group : 2, title : c_score});
                  data_edges.push({from: id, to: sub_idx});

                  $("body").data('' + sub_idx , c_text );
              });

            $(this).contents().empty(); 
            var m_text = $(this).text().trim();
            var m_score = $(this).attr("score");
            // console.log(idx, m_score, m_text);

            //main 노드 추가
            data_nodes.push({id: id, label: m_text, group : 1, title : m_score});
            data_edges.push({from: 0, to: id});
            
            $("body").data('' + id , m_text );
          });
        }
        // console.log(data_nodes);

        var container = document.getElementById(element_id);
        var data = {
          nodes: data_nodes,
          edges: data_edges
        };

        var network = new vis.Network(container, data, options);
        network.on("doubleClick", function (params) {
          var node_id = params.nodes[0];

          if (node_id == 0){
            return;
          }

          var value = $("body").data(node_id);
          if (value !== ""){
              // alert(value);
              window.open(window.location.pathname + "?word=" + encodeURI(value));
          }
        });
      },
      error: function(xhr, status, error) {
        alert(error); 
      }
    });
  }