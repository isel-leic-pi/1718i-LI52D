using System;
using System.Net;
using  Newtonsoft.Json;
using System.Threading;

static class App
{
    class LeagueTable {
        public string matchday;
        public Standing[] standing;
        public string leagueCaption;
    }

    class Standing {
        public string teamName;
        public int goals;
        public int playedGames;
    }
    
    const string FOOTBALL_URI = "http://api.football-data.org/v1/soccerseasons/{0}/leagueTable";
    
    static void Main()
    {
        GetAsync(445);
        // Thread.Sleep(500);
        GetAsync(446);
        // Thread.Sleep(500);
        GetAsync(457);
        
        Console.ReadLine();
    }
    static void GetSync(int leagueId) {
        Console.WriteLine("...... Requesting " + leagueId);
        string path = string.Format(FOOTBALL_URI, leagueId);
        using(WebClient client = new WebClient()) {
            string content = client.DownloadString(path);
            LeagueTable league = JsonConvert.DeserializeObject<LeagueTable>(content);
            Console.WriteLine("> {0} --- leader: {1}", 
                league.leagueCaption, 
                league.standing[0].teamName);        
        }
        
    }
    static void GetAsync(int leagueId) { 
        Console.WriteLine("...... Requesting " + leagueId);
        string path = string.Format(FOOTBALL_URI, leagueId);
        WebClient client = new WebClient();
        client.DownloadStringCompleted += (sender, args) => {
            LeagueTable league = JsonConvert.DeserializeObject<LeagueTable>(args.Result);
            Console.WriteLine("> {0} --- leader: {1}", 
                    league.leagueCaption, 
                    league.standing[0].teamName);        
        };
        client.DownloadStringAsync(new Uri(path));
    }
}