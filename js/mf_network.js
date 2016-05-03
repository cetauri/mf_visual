
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

        data_nodes = [{id: 0, label: '', group : 0}];
        data_edges = [];

        if ($(xml).find("List").find("Member").length > 0) {

          $(xml).find("Member").each(function(idx) {

              var id = idx + 1;
              var m_score = $(this).attr("score");
              var children = $(this).clone();
              children.find("Child").each(function(i) {
              // Child 노드 추가
              // console.log(idx, i, $(this).text());
              var sub_idx = id + '.' + i;
              data_nodes.push({id: id + '.' + i, label: $(this).text(), group : 2});
              data_edges.push({from: id, to: sub_idx});

          });

          $(this).contents().empty(); 
          var m_text = $(this).text().trim();

          // console.log(idx, m_score, m_text);

          //main 노드 추가
          data_nodes.push({id: id, label: m_text, group : 1});
          data_edges.push({from: 0, to: id});

        });

        }
        // console.log(data_nodes);

        var container = document.getElementById(element_id);
        var data = {
          nodes: data_nodes,
          edges: data_edges
        };

        var network = new vis.Network(container, data, options);

      }, 
      error: function(xhr, status, error) {
        alert(error); 
      }
    });
  }