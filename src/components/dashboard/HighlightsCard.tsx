
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Film } from "lucide-react";
import { format } from "date-fns";

// Define the highlight type
interface Highlight {
  id: string;
  title: string;
  description: string;
  date: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

interface HighlightsCardProps {
  highlights: Highlight[];
}

export function HighlightsCard({ highlights }: HighlightsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Recent Highlights</CardTitle>
          <Button variant="link" className="p-0 h-auto" size="sm">
            See all <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {highlights.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {highlights.map((highlight) => (
                <CarouselItem key={highlight.id} className="basis-full sm:basis-1/2 md:basis-1/3">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-md relative group">
                      <img
                        src={highlight.thumbnailUrl}
                        alt={highlight.title}
                        className="aspect-video object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Film className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="font-medium text-white text-sm line-clamp-1">{highlight.title}</h3>
                        <div className="flex justify-between text-xs text-white/80 mt-1">
                          <span>{format(new Date(highlight.date), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-2">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        ) : (
          <p className="text-muted-foreground text-sm">No highlights available</p>
        )}
      </CardContent>
    </Card>
  );
}
