// This is where the magic happens
// Written by Fredrik August Madsen-Malmo (github@fredrikaugust)

var URL = "https://api.github.com/repos/devfsa/vagas/issues";

function display_issues () {
  $.get({
    url: URL,
    success: function (data) {
      show_issues_in_dom(data);
      $('.progress').slideUp();
    }
  });
}

function generate_label_html (labels) {
  var label_string = "";

  labels.forEach(function (label) {
    label_string += "<div class='chip'>" + label.name + "</div>";
  });

  return label_string;
}

function create_issue_url (issue) {
  var loc = window.location.href;
  if (loc.slice(-1) == '/') {
    return loc + 'issue.html?issue=' + issue;
  }
  return loc.replace(/\w+\.[^\.]+$/, '') + 'issue.html?issue=' + issue;
}

function show_issues_in_dom (issues, pages) {
  issues.forEach(function (issue) {
    $('#cards .row').append(
      `<div class='col s12'>
        <div class='card'>
          <div class='card-content'>
            <span class='card-title teal-text text-darken-4'>
              ${issue.title}
            </span>
            ${generate_label_html(issue.labels)}
            <p>${marked(issue.body).replace('<img', '<img class="responsive-img"').replace(/h[1-6]/g, 'h5')}</p>
          </div>
          <div class='card-action'>
            <a href='${create_issue_url(issue.number)}'>Leia mais</a>
            <a target='_blank' href='${issue.html_url}'>Ver no Github</a>
          </div>
        </div>
      </div>`
    );

  });
}

$(document).ready(function () {
  display_issues();
});
