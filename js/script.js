const ApiKey = "d1462a05d6d246b396e6ffb09f5705e5";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                    </p>
                    <a href="#DetailTeam" data-id="${team.id}" class="secondary-content"><i class="material-icons" data-id="${team.id}">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>';
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn => {
                btn.onclick = (event) => {
                    DetailTeam(event.target.dataset.id)
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function DetailTeam(id) {
    title.innerHTML = "DETAIL TEAM";
    let infoEndpoin = baseUrl + "teams/" + id

    fetch(infoEndpoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.squad)
            let sqd = "";
            let rwt = ""
            let a = 1;
            let b = 1;
            let Gambar = resJson.crestUrl;
            let Nama = resJson.name;
            let nama_pendek = resJson.shortName;
            let alamat = resJson.address;
            let kontak = resJson.phone;
            let Email = resJson.email;
            let berdiri = resJson.founded;
            let std = resJson.venue;
            resJson.activeCompetitions.forEach(riwayat => {
                rwt += `
                <tr>
                    <td style="padding-left:20px;">${a}.</td>
                    <td>${riwayat.id}</td>
                    <td>${riwayat.area.name}</td>
                    <td>${riwayat.name}</td>
                    <td>${riwayat.code}</td>
                    <td>${riwayat.plan}</td>
                </tr>
                `;
                a++;
            })
            resJson.squad.forEach(data => {
                sqd += `
                <tr>
                    <td style="padding-left:20px;">${b}.</td>
                    <td>${data.name}</td>
                    <td>${data.position}</td>
                    <td>${data.dateOfBirth}</td>
                    <td>${data.countryOfBirth}</td>
                    <td>${data.nationality}</td>
                    <td>${data.shirtNumber}</td>
                    <td>${data.role}</td>
                </tr>
                `;
                b++;
            })
            contents.innerHTML = `
                <div class="card">
                    <div class="row" style="padding-top:10px;">
                        <div class="col s3">
                            <img src="${Gambar}">
                        </div>
                        <div class="col s9">
                            <h6><b>${Nama}</b></h6>
                            <span>Nama Pendek  : ${nama_pendek}</span><br>
                            <span>Alamat       : ${alamat}</span><br>
                            <span>Kontak       : ${kontak}</span><br>
                            <span>Email        : ${Email}</span><br>
                            <span>Berdiri      : Sejak Tahun ${berdiri}</span><br>
                            <span>Nama Stadion : ${std}</span><br>
                        </div>
                    </div>
                </div>
                <h5>AKTIFITAS KOMPETISI</h5>
                <div class="card">
                    <table class="centered responsive-table">
                        <thead>
                            <th>No.</th>
                            <th>Tahun</th>
                            <th>Tempat</th>
                            <th>Nama Liga</th>
                            <th>Code</th>
                            <th>Liga</th>
                        </thead>
                        <tbody>
                            ${rwt}
                        </tbody>
                    </table>
                </div>
                <h5>DAFTAR PEMAIN</h5>
                <div class="card">
                    <table class="centered responsive-table">
                        <thead>
                            <th>No.</th>
                            <th>Nama Pemain</th>
                            <th>Posisi</th>
                            <th>Tanggal Lahir</th>
                            <th>Domisili</th>
                            <th>Negara</th>
                            <th>Nomor Punggung</th>
                            <th>Role</th>
                        </thead>
                        <tbody>
                            ${sqd}
                        </tbody>
                    </table>
                </div>
            `;
        })
}


function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;
            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});