$(document).ready(function () {
    const checkedA = {};
    $(document).on('change', "input[type='checkbox']", function () {
      if (this.checked) {
        checkedA[$(this).data('id')] = $(this).data('name');
      } else {
        delete checkedA[$(this).data('id')];
      }
      const lst = Object.values(checkedA);
      if (lst.length > 0) {
        $('div.amenities > h4').text(Object.values(checkedA).join(', '));
      } else {
        $('div.amenities > h4').html('&nbsp;');
      }
    });
  $.get("http://0.0.0.0:5001/api/v1/status/",
    function (data) {
      if (data.status === "OK") {
        $('div#api_status').toggleClass('available', true);
      }
    });
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search", // Replace with your API endpoint
    method: "POST",
    contentType: "application/json",
    data: "{}",
    success: function(data) {
      // Handle the successful response
      for (const d of data) {
        let article = $('<article>');
        let titleDiv = $('<div>').addClass('title_box').html('<h2>' + d.name + '</h2>');
        let priceDiv = $('<div>').addClass('price_by_night').text(d.price_by_night);
        titleDiv.append(priceDiv);
        let infoDiv = $('<div>').addClass('information');
        let guestDiv = $('<div>').addClass('max_guest').text(d.max_guest);
        let roomDiv = $('<div>').addClass('number_rooms').text(d.number_rooms);
        let bathroomDiv = $('<div>').addClass('number_bathrooms').text(d.number_bathrooms);
        guestDiv.appendTo(infoDiv);
        roomDiv.appendTo(infoDiv);
        bathroomDiv.appendTo(infoDiv);
        infoDiv.append(guestDiv);
        let userDiv = $('<div>').addClass('user');
        let descriptionDiv = $('<div>').addClass('description').html(d.description);
        userDiv.append(descriptionDiv);
        titleDiv.appendTo(article);
        infoDiv.appendTo(article);
        userDiv.appendTo(article);
        article.appendTo('section.places');
      }
    },
    error: function(xhr, status, error) {
        // Handle errors
        console.error("Error fetching data:", status, error);
    }
  });
  });
  