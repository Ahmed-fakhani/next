import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <p>test</p>
            <Card>
                <CardHeader> 
                    <CardTitle>
                          Sales
                    </CardTitle>
                </CardHeader>
                <CardDescription>des</CardDescription>
                <CardContent>
                    <p>
                        Text
                    </p>
                </CardContent>
            </Card>

        </div>
    )
}