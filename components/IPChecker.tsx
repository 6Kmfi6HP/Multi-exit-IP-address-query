'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Globe, ChevronDown, ChevronRight, RotateCw } from 'lucide-react';
import type { SpeedTestResponse, IPResult } from '@/lib/types';
import { checkIP } from '@/lib/websocket';
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function IPChecker() {
  const [results, setResults] = useState<(IPResult & { isOpen?: boolean })[]>([]);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleLocation = (index: number) => {
    setResults(prev => prev.map((result, i) => 
      i === index ? { ...result, isOpen: !result.isOpen } : result
    ));
  };

  const resetChecker = () => {
    setResults([]);
    setProgress(0);
    setTotal(0);
    setCompleted(0);
    setLoading(true);
    setError(null);
    fetchAndCheckIPs();
  };

  const fetchAndCheckIPs = async () => {
    try {
      const response = await fetch('/api/speedtest');
      const data: SpeedTestResponse = await response.json();
      setTotal(data.servers.length);
      
      const results: (IPResult & { isOpen?: boolean })[] = [];
      setCompleted(0);

      const checkServer = async (server: typeof data.servers[0]) => {
        const ip = await checkIP(server.host);
        setCompleted(prev => {
          const newCompleted = prev + 1;
          setProgress((newCompleted / data.servers.length) * 100);
          return newCompleted;
        });
        
        if (ip) {
          // 检查是否已存在相同IP
          const existingResult = results.find(r => r.ip === ip);
          const currentLocation = `${server.name}, ${server.country}`;
          
          if (!existingResult) {
            results.push({
              host: server.host,
              ip,
              location: currentLocation,
            });
            setResults([...results]);
          } else {
            // 检查位置是否已存在
            const locations = existingResult.location.split(' | ');
            if (!locations.includes(currentLocation)) {
              // 如果位置不存在，则添加新位置
              existingResult.location += ` | ${currentLocation}`;
              setResults([...results]);
            }
          }
        }
      };

      // Check IPs in parallel, but limit concurrency
      const batchSize = 10;
      for (let i = 0; i < data.servers.length; i += batchSize) {
        const batch = data.servers.slice(i, i + batchSize);
        await Promise.all(batch.map(checkServer));
      }
    } catch (err) {
      setError('Failed to fetch server list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndCheckIPs();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Multi-IP Checker</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetChecker}
            disabled={loading && progress === 0}
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress: {completed}/{total} ({Math.round(progress)}%)</span>
              <span>Unique IPs: {results.length}</span>
            </div>
            <Progress value={progress} />
          </div>

          {loading && progress === 0 && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          )}

          <ScrollArea className="h-[60vh] rounded-md border">
            <div className="p-4 space-y-2">
              {results.map((result, index) => {
                const locations = result.location.split(' | ');
                const hasMultipleLocations = locations.length > 1;
                
                return (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-primary">{result.ip}</span>
                      {hasMultipleLocations ? (
                        <Collapsible open={result.isOpen}>
                          <div className="flex items-center">
                            <span className="text-sm text-muted-foreground mr-2">
                              {locations[0]} +{locations.length - 1}
                            </span>
                            <CollapsibleTrigger 
                              onClick={() => toggleLocation(index)}
                              className="p-1 hover:bg-secondary-foreground/10 rounded"
                            >
                              {result.isOpen ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </CollapsibleTrigger>
                          </div>
                          <CollapsibleContent className="mt-2 space-y-1">
                            {locations.slice(1).map((location, i) => (
                              <div 
                                key={i} 
                                className="text-sm text-muted-foreground pl-4 border-l-2 border-border"
                              >
                                {location}
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {result.location}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
}