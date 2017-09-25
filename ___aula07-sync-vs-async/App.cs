using System;
using System.Net;
using  Newtonsoft.Json;

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
        GetSync(426);
        GetSync(430);
        GetSync(436);
        
        GetAsync(426);
        GetAsync(430);
        GetAsync(436);
        Console.ReadLine();
    }
    static void GetSync(int leagueId) {
        Console.WriteLine("...... Requesting " + leagueId);
        string path = string.Format(FOOTBALL_URI, leagueId);
        WebClient client = new WebClient();
        string content = client.DownloadString(path);
        LeagueTable league = JsonConvert.DeserializeObject<LeagueTable>(content);
        Console.WriteLine(league.leagueCaption);
        Console.WriteLine(league.standing[0].teamName);        
    }
    static void GetAsync(int leagueId) { 
        Console.WriteLine("...... Requesting " + leagueId);
        string path = string.Format(FOOTBALL_URI, leagueId);
        WebClient client = new WebClient();
        client.DownloadStringCompleted += GetAsyncCallback;
        client.DownloadStringAsync(new Uri(path));
    }

    static void GetAsyncCallback(object sender, DownloadStringCompletedEventArgs args){
        LeagueTable league = JsonConvert.DeserializeObject<LeagueTable>(args.Result);
        Console.WriteLine(league.leagueCaption);
        Console.WriteLine(league.standing[0].teamName);        
    }
}