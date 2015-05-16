function getUser() {
  var data = [];
  var screenView = {
    event: 'settings-screen',
    experiment: Math.random() < 0.5 ? 'green-button' : 'original',
    date: Math.floor(Math.random() * 30) + 1
  };

  data.push(screenView);
  if ((screenView.experiment === 'green-button' && Math.random() < 0.2) ||
    (screenView.experiment === 'original' && Math.random() < 0.15)) {
    data.push({
      event: 'settings-button-click',
      experiment: screenView.experiment,
      date: screenView.date
    });
  }
  return data;
}

var res = [];
for (var i=0; i<50; i++) {
  res = res.concat(getUser());
  $.post('http://ltimate.azurewebsites.net/fitness/users', {stats: res})
}

function query(data) {
  console.log(data);
  var clicks = data.filter(function(el) {
    return el.event === 'settings-button-click';
  }).length;

  var views = data.filter(function(el) {
    return el.event === 'settings-screen';
  }).length;

  return {
    value: (clicks / views).toFixed(3),
    n: clicks
  };
}