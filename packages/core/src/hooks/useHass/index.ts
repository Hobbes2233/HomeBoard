import { useState, useCallback } from "react";
import type { Route } from "../../types/route";

export interface HassContextProps {
  addRoute: (route: Route) => void;
  getRoute: (path: string) => Route | undefined;
  callApi: (endpoint: string, options?: any) => Promise<any>;
  getAllEntities: () => Record<string, any>;
  callService: (domain: string, service: string, data?: any) => Promise<void>;
  joinHassUrl: (path: string) => string;
}

export function useHass(): HassContextProps {
  const [routes, setRoutes] = useState<Route[]>([]);

  const addRoute = useCallback((route: Route) => {
    setRoutes(prev => [...prev, route]);
  }, []);

  const getRoute = useCallback((path: string) => {
    return routes.find(route => route.path === path);
  }, [routes]);

  const callApi = useCallback(async (endpoint: string, options?: any) => {
    // Placeholder API call - in a real app, this would make actual HTTP requests
    console.log(`API call to ${endpoint}`, options);
    return { status: "success", data: null };
  }, []);

  const getAllEntities = useCallback(() => {
    // Return empty object since we're not connected to HA
    return {};
  }, []);

  const callService = useCallback(async (domain: string, service: string, data?: any) => {
    // Placeholder service call
    console.log(`Service call: ${domain}.${service}`, data);
  }, []);

  const joinHassUrl = useCallback((path: string) => {
    // Return the path as-is since we're not connected to HA
    return path;
  }, []);

  return {
    addRoute,
    getRoute,
    callApi,
    getAllEntities,
    callService,
    joinHassUrl,
  };
}
