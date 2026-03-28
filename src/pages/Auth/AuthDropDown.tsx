import React from 'react'
import type { user } from '@/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { User, ShoppingCart, Heart, LogOut, LayoutDashboardIcon, CreditCard, Settings } from 'lucide-react'

const AuthDropDown = ({ users }: { users: user }) => {
    return (
        !users ? (
            <Link to="/login">
                <Button variant="outline">login</Button>
            </Link>
        ) : (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={users.imageUrl} alt={users.username} />
                            <AvatarFallback>
                                {users.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {users.username.charAt(0).toUpperCase() + users.username.slice(1)}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {users.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link to="/profile">
                                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link to="/billing">
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                                <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link to="/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                            </Link>
                        </DropdownMenuItem>



                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                            <Link to="/login">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    );
}

export default AuthDropDown