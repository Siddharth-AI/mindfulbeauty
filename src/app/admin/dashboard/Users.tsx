// "use client";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { format } from "date-fns";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   image: string;
//   createdAt: string;
//   status: "active" | "inactive";
// }

// export default function Users() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch users data here
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("/api/users");
//         const data = await response.json();
//         setUsers(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Users</h1>
//         <Button>Add New User</Button>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>User</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Joined Date</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell className="flex items-center gap-3">
//                   <Avatar>
//                     <AvatarImage src={user.image} alt={user.name} />
//                     <AvatarFallback>
//                       {user.name.substring(0, 2).toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <span>{user.name}</span>
//                 </TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   <Badge
//                     variant={user.status === "active" ? "success" : "destructive"}
//                   >
//                     {user.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   {format(new Date(user.createdAt), "MMM dd, yyyy")}
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm">
//                       Edit
//                     </Button>
//                     <Button variant="destructive" size="sm">
//                       Delete
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
