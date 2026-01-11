import { Navbar } from "@/components/Navbar";
import { useReviews, useSystemStatus } from "@/hooks/use-reviews";
import { formatDistanceToNow } from "date-fns";
import { Activity, GitPullRequest, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

export default function Dashboard() {
  const { data: reviews, isLoading, error } = useReviews();
  const { data: status } = useSystemStatus();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Live Dashboard</h1>
            <p className="text-muted-foreground">Real-time view of processed Pull Requests</p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className={`w-2.5 h-2.5 rounded-full ${status?.status === 'ok' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 animate-pulse'}`} />
            <span className="text-sm font-medium text-white uppercase tracking-wider">
              System: {status?.status || "Connecting..."}
            </span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/20 text-primary">
                <GitPullRequest className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Reviewed</p>
                <h3 className="text-3xl font-bold text-white">{reviews?.length || 0}</h3>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Avg. Time</p>
                <h3 className="text-3xl font-bold text-white">~4.2s</h3>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-500/20 text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Issues Found</p>
                <h3 className="text-3xl font-bold text-white">12</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews List */}
        <div className="rounded-xl border border-white/10 bg-[#0F0F0F] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Recent Activity
            </h3>
          </div>

          {isLoading ? (
            <div className="p-12 flex justify-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-400">
              Failed to load reviews. Is the backend running?
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="divide-y divide-white/5">
              {reviews.map((review: any) => (
                <div key={review.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-3">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                        <GitPullRequest className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                          {review.repoName} <span className="text-muted-foreground font-normal">#{review.prNumber}</span>
                        </h4>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                          {review.summary || "No summary available"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-right whitespace-nowrap">
                       <CheckCircle2 className="w-4 h-4 text-green-500" />
                       {review.createdAt ? formatDistanceToNow(new Date(review.createdAt), { addSuffix: true }) : 'Just now'}
                    </div>
                  </div>
                  
                  {/* Tags for detected issues (Simulated visualization) */}
                  <div className="pl-14 flex gap-2">
                     <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/10">
                        Code Review
                     </span>
                     {/* Randomly showing badges for visual completeness based on simulated data assumptions */}
                     <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                        LLaMA3-70b
                     </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground">
              No reviews found yet. Connect the GitHub Action to start seeing data here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
